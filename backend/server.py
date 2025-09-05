from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from datetime import datetime
from typing import List, Optional

from database import database
from models import (
    BlogPost, BlogPostCreate, BlogPostUpdate,
    ContactMessage, ContactMessageCreate,
    AboutContent, AboutContentUpdate,
    PostsResponse, MessageResponse
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Zirve Hikayem API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Database connection events
@app.on_event("startup")
async def startup_db_client():
    await database.connect()
    logger.info("Connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_db_client():
    await database.disconnect()
    logger.info("Disconnected from MongoDB")

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Zirve Hikayem API", "version": "1.0.0"}

# Blog Posts Endpoints
@api_router.get("/posts", response_model=List[BlogPost])
async def get_posts(
    category: Optional[str] = Query(None, description="Filter posts by category"),
    featured: Optional[bool] = Query(None, description="Get only featured posts")
):
    """Get all blog posts with optional filtering"""
    try:
        posts_data = await database.get_posts(
            category=category,
            featured_only=featured or False
        )
        
        posts = []
        for post_data in posts_data:
            # Convert MongoDB document to BlogPost model
            post_dict = dict(post_data)
            if '_id' in post_dict:
                del post_dict['_id']
            posts.append(BlogPost(**post_dict))
        
        return posts
    except Exception as e:
        logger.error(f"Error getting posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/posts/featured", response_model=List[BlogPost])
async def get_featured_posts():
    """Get only featured blog posts"""
    return await get_posts(featured=True)

@api_router.get("/posts/{slug}", response_model=BlogPost)
async def get_post_by_slug(slug: str):
    """Get a single blog post by slug"""
    try:
        post_data = await database.get_post_by_slug(slug)
        
        if not post_data:
            raise HTTPException(status_code=404, detail="Post not found")
        
        # Convert MongoDB document to BlogPost model
        post_dict = dict(post_data)
        if '_id' in post_dict:
            del post_dict['_id']
        
        return BlogPost(**post_dict)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting post by slug {slug}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/posts", response_model=BlogPost)
async def create_post(post_create: BlogPostCreate):
    """Create a new blog post"""
    try:
        # Generate slug and read time
        slug = BlogPost.generate_slug(post_create.title)
        read_time = BlogPost.calculate_read_time(post_create.content)
        
        # Check if slug already exists
        if await database.slug_exists(slug):
            # Add timestamp to make slug unique
            slug = f"{slug}-{int(datetime.now().timestamp())}"
        
        # Create post data
        post_data = post_create.dict()
        post_data.update({
            "slug": slug,
            "readTime": read_time,
            "publishDate": datetime.now().strftime("%Y-%m-%d")
        })
        
        # Create BlogPost instance to generate ID
        blog_post = BlogPost(**post_data)
        
        # Save to database
        created_post_data = await database.create_post(blog_post.dict())
        
        # Convert back to BlogPost model
        post_dict = dict(created_post_data)
        if '_id' in post_dict:
            del post_dict['_id']
        
        return BlogPost(**post_dict)
    except Exception as e:
        logger.error(f"Error creating post: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/posts/{post_id}", response_model=BlogPost)
async def update_post(post_id: str, post_update: BlogPostUpdate):
    """Update an existing blog post"""
    try:
        # Get current post
        current_post = await database.get_post_by_id(post_id)
        if not current_post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        # Prepare update data
        update_data = {k: v for k, v in post_update.dict().items() if v is not None}
        
        # Update slug if title changed
        if "title" in update_data:
            new_slug = BlogPost.generate_slug(update_data["title"])
            if await database.slug_exists(new_slug, exclude_id=post_id):
                new_slug = f"{new_slug}-{int(datetime.now().timestamp())}"
            update_data["slug"] = new_slug
        
        # Update read time if content changed
        if "content" in update_data:
            update_data["readTime"] = BlogPost.calculate_read_time(update_data["content"])
        
        # Update post
        updated_post_data = await database.update_post(post_id, update_data)
        
        if not updated_post_data:
            raise HTTPException(status_code=404, detail="Post not found")
        
        # Convert back to BlogPost model
        post_dict = dict(updated_post_data)
        if '_id' in post_dict:
            del post_dict['_id']
        
        return BlogPost(**post_dict)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating post {post_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.delete("/posts/{post_id}", response_model=MessageResponse)
async def delete_post(post_id: str):
    """Delete a blog post"""
    try:
        deleted = await database.delete_post(post_id)
        
        if not deleted:
            raise HTTPException(status_code=404, detail="Post not found")
        
        return MessageResponse(message="Post deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting post {post_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Categories Endpoint
@api_router.get("/categories", response_model=List[str])
async def get_categories():
    """Get all unique categories"""
    try:
        categories = await database.get_categories()
        return categories
    except Exception as e:
        logger.error(f"Error getting categories: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Contact Endpoints
@api_router.post("/contact", response_model=MessageResponse)
async def create_contact_message(message_create: ContactMessageCreate):
    """Submit a contact form message"""
    try:
        # Create ContactMessage instance
        contact_message = ContactMessage(**message_create.dict())
        
        # Save to database
        await database.create_contact_message(contact_message.dict())
        
        return MessageResponse(message="Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.")
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(status: Optional[str] = Query(None, description="Filter by message status")):
    """Get all contact messages (admin only)"""
    try:
        messages_data = await database.get_contact_messages(status=status)
        
        messages = []
        for message_data in messages_data:
            # Convert MongoDB document to ContactMessage model
            message_dict = dict(message_data)
            if '_id' in message_dict:
                del message_dict['_id']
            messages.append(ContactMessage(**message_dict))
        
        return messages
    except Exception as e:
        logger.error(f"Error getting contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/contact/{message_id}/status", response_model=MessageResponse)
async def update_message_status(message_id: str, status: str = Query(..., regex="^(new|read|replied)$")):
    """Update contact message status"""
    try:
        updated = await database.update_message_status(message_id, status)
        
        if not updated:
            raise HTTPException(status_code=404, detail="Message not found")
        
        return MessageResponse(message="Message status updated successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating message status {message_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# About Content Endpoints
@api_router.get("/about", response_model=AboutContent)
async def get_about_content():
    """Get about page content"""
    try:
        content_data = await database.get_about_content()
        
        if not content_data:
            # Return default content if none exists
            default_content = AboutContent(
                description="""
                    Merhaba, ben Zirve Hikayem! Bu platformda hayatımın farklı dönemlerinde yaşadığım deneyimleri, 
                    girişimcilik yolculuğumda karşılaştığım zorlukları ve başarıları, kişisel gelişim serüvenimde 
                    öğrendiklerimi sizlerle paylaşıyorum.
                    
                    Amacım, kendi hikayelerim aracılığıyla sizlere ilham vermek ve belki de benzer yollardan geçenler 
                    için rehber olmak. Çünkü inanıyorum ki her deneyim bir ders, her ders ise yeni bir başlangıç.
                """,
                mission="İnsanların kendi potansiyellerini keşfetmelerine yardımcı olmak ve başarı yolculuklarında yanlarında olmak.",
                values=[
                    "Samimi ve dürüst paylaşımlar",
                    "Sürekli öğrenme ve gelişim",
                    "Topluma değer katma",
                    "İlham verici içerik üretimi"
                ]
            )
            return default_content
        
        # Convert MongoDB document to AboutContent model
        content_dict = dict(content_data)
        if '_id' in content_dict:
            del content_dict['_id']
        
        return AboutContent(**content_dict)
    except Exception as e:
        logger.error(f"Error getting about content: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/about", response_model=AboutContent)
async def update_about_content(content_update: AboutContentUpdate):
    """Update about page content (admin only)"""
    try:
        # Get current content
        current_content = await database.get_about_content()
        
        # Prepare update data
        update_data = {k: v for k, v in content_update.dict().items() if v is not None}
        
        if current_content:
            # Merge with existing content
            current_dict = dict(current_content)
            current_dict.update(update_data)
            if '_id' in current_dict:
                del current_dict['_id']
        else:
            # Create new content with defaults
            current_dict = AboutContent().dict()
            current_dict.update(update_data)
        
        # Update in database
        updated_content_data = await database.update_about_content(current_dict)
        
        # Convert back to AboutContent model
        content_dict = dict(updated_content_data)
        if '_id' in content_dict:
            del content_dict['_id']
        
        return AboutContent(**content_dict)
    except Exception as e:
        logger.error(f"Error updating about content: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)