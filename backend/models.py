from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime
import uuid
import re

# Blog Post Models
class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    excerpt: str = Field(..., min_length=1, max_length=500)
    content: str = Field(..., min_length=1)
    category: str = Field(..., min_length=1, max_length=50)
    tags: List[str] = Field(default=[])
    featured: bool = Field(default=False)

    @validator('title')
    def validate_title(cls, v):
        if not v or not v.strip():
            raise ValueError('Title cannot be empty')
        return v.strip()

    @validator('tags')
    def validate_tags(cls, v):
        return [tag.strip() for tag in v if tag.strip()]

class BlogPostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    excerpt: Optional[str] = Field(None, min_length=1, max_length=500)
    content: Optional[str] = None
    category: Optional[str] = Field(None, min_length=1, max_length=50)
    tags: Optional[List[str]] = None
    featured: Optional[bool] = None

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    author: str = Field(default="Zirve Hikayem")
    publishDate: str
    category: str
    tags: List[str] = Field(default=[])
    readTime: str
    featured: bool = Field(default=False)
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    @staticmethod
    def generate_slug(title: str) -> str:
        """Generate URL-friendly slug from title"""
        # Convert to lowercase and handle Turkish characters
        slug = title.lower()
        turkish_chars = {
            'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
            'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
        }
        for turkish, english in turkish_chars.items():
            slug = slug.replace(turkish, english)
        
        # Remove special characters and replace spaces with hyphens
        slug = re.sub(r'[^a-z0-9\s-]', '', slug)
        slug = re.sub(r'\s+', '-', slug)
        slug = re.sub(r'-+', '-', slug)
        return slug.strip('-')

    @staticmethod
    def calculate_read_time(content: str) -> str:
        """Calculate estimated reading time based on content length"""
        word_count = len(content.split())
        # Average reading speed: 200 words per minute
        minutes = max(1, round(word_count / 200))
        return f"{minutes} dakika"

# Contact Models
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., pattern=r'^[^@]+@[^@]+\.[^@]+$')
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)

    @validator('name', 'message')
    def validate_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip()

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    status: str = Field(default="new")  # new, read, replied
    createdAt: datetime = Field(default_factory=datetime.utcnow)

# About Content Models
class AboutContent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    key: str = Field(default="about_content")
    title: str = Field(default="Zirve Hikayem")
    subtitle: str = Field(default="Her deneyim bir hikaye, her hikaye bir ders")
    description: str
    mission: str
    values: List[str] = Field(default=[])
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class AboutContentUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    description: Optional[str] = None
    mission: Optional[str] = None
    values: Optional[List[str]] = None

# Response Models
class PostsResponse(BaseModel):
    posts: List[BlogPost]
    total: int
    categories: List[str]

class MessageResponse(BaseModel):
    message: str
    status: str = "success"