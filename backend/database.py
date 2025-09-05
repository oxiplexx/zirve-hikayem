from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import List, Optional
import os
from .models import BlogPost, ContactMessage, AboutContent

class Database:
    def __init__(self):
        self.client = None
        self.db = None

    async def connect(self):
        """Connect to MongoDB"""
        mongo_url = os.environ.get('MONGO_URL')
        db_name = os.environ.get('DB_NAME', 'zirvehikayem')
        
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client[db_name]
        
        # Create indexes
        await self.create_indexes()

    async def disconnect(self):
        """Disconnect from MongoDB"""
        if self.client:
            self.client.close()

    async def create_indexes(self):
        """Create database indexes for better performance"""
        # Blog posts indexes
        await self.db.blog_posts.create_index("slug", unique=True)
        await self.db.blog_posts.create_index("category")
        await self.db.blog_posts.create_index("featured")
        await self.db.blog_posts.create_index("publishDate")
        
        # Contact messages index
        await self.db.contact_messages.create_index("createdAt")
        await self.db.contact_messages.create_index("status")
        
        # About content index
        await self.db.about_content.create_index("key", unique=True)

    # Blog Posts Methods
    async def get_posts(self, category: Optional[str] = None, featured_only: bool = False, limit: Optional[int] = None) -> List[dict]:
        """Get blog posts with optional filtering"""
        query = {}
        
        if category and category != "Tümü":
            query["category"] = category
        
        if featured_only:
            query["featured"] = True
        
        cursor = self.db.blog_posts.find(query).sort("publishDate", -1)
        
        if limit:
            cursor = cursor.limit(limit)
        
        posts = await cursor.to_list(None)
        return posts

    async def get_post_by_slug(self, slug: str) -> Optional[dict]:
        """Get a single blog post by slug"""
        post = await self.db.blog_posts.find_one({"slug": slug})
        return post

    async def get_post_by_id(self, post_id: str) -> Optional[dict]:
        """Get a single blog post by ID"""
        post = await self.db.blog_posts.find_one({"id": post_id})
        return post

    async def create_post(self, post_data: dict) -> dict:
        """Create a new blog post"""
        post_data["createdAt"] = datetime.utcnow()
        post_data["updatedAt"] = datetime.utcnow()
        
        result = await self.db.blog_posts.insert_one(post_data)
        
        # Return the created post
        created_post = await self.db.blog_posts.find_one({"_id": result.inserted_id})
        return created_post

    async def update_post(self, post_id: str, update_data: dict) -> Optional[dict]:
        """Update an existing blog post"""
        update_data["updatedAt"] = datetime.utcnow()
        
        result = await self.db.blog_posts.update_one(
            {"id": post_id},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            updated_post = await self.db.blog_posts.find_one({"id": post_id})
            return updated_post
        
        return None

    async def delete_post(self, post_id: str) -> bool:
        """Delete a blog post"""
        result = await self.db.blog_posts.delete_one({"id": post_id})
        return result.deleted_count > 0

    async def get_categories(self) -> List[str]:
        """Get all unique categories from blog posts"""
        categories = await self.db.blog_posts.distinct("category")
        return ["Tümü"] + sorted(categories)

    async def slug_exists(self, slug: str, exclude_id: Optional[str] = None) -> bool:
        """Check if a slug already exists"""
        query = {"slug": slug}
        if exclude_id:
            query["id"] = {"$ne": exclude_id}
        
        post = await self.db.blog_posts.find_one(query)
        return post is not None

    # Contact Messages Methods
    async def create_contact_message(self, message_data: dict) -> dict:
        """Create a new contact message"""
        message_data["createdAt"] = datetime.utcnow()
        
        result = await self.db.contact_messages.insert_one(message_data)
        
        # Return the created message
        created_message = await self.db.contact_messages.find_one({"_id": result.inserted_id})
        return created_message

    async def get_contact_messages(self, status: Optional[str] = None) -> List[dict]:
        """Get contact messages with optional status filter"""
        query = {}
        if status:
            query["status"] = status
        
        messages = await self.db.contact_messages.find(query).sort("createdAt", -1).to_list(None)
        return messages

    async def update_message_status(self, message_id: str, status: str) -> bool:
        """Update contact message status"""
        result = await self.db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": status}}
        )
        return result.modified_count > 0

    # About Content Methods
    async def get_about_content(self) -> Optional[dict]:
        """Get about page content"""
        content = await self.db.about_content.find_one({"key": "about_content"})
        return content

    async def update_about_content(self, content_data: dict) -> dict:
        """Update about page content"""
        content_data["updatedAt"] = datetime.utcnow()
        content_data["key"] = "about_content"
        
        result = await self.db.about_content.update_one(
            {"key": "about_content"},
            {"$set": content_data},
            upsert=True
        )
        
        # Return the updated content
        updated_content = await self.db.about_content.find_one({"key": "about_content"})
        return updated_content

# Global database instance
database = Database()