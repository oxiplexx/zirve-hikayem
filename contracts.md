# Zirve Hikayem Blog - API Contracts & Integration Plan

## Overview
This document outlines the API contracts and integration strategy for converting the mock-based frontend to a fully functional full-stack blog application.

## Mock Data Analysis

### Current Mock Data (mock.js)
- **Blog Posts**: 5 sample posts with fields: id, title, slug, excerpt, content, author, publishDate, category, tags, readTime, featured
- **Categories**: Static list of blog categories
- **About Content**: Static about page content with title, subtitle, description, mission, values
- **Contact Form**: Frontend-only form submission with toast notifications

## Backend Implementation Plan

### 1. Database Models

#### BlogPost Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (required, unique),
  excerpt: String (required),
  content: String (required),
  author: String (default: "Zirve Hikayem"),
  publishDate: Date (default: now),
  category: String (required),
  tags: [String],
  readTime: String (auto-calculated),
  featured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### ContactMessage Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  subject: String,
  message: String (required),
  createdAt: Date (default: now),
  status: String (enum: ['new', 'read', 'replied'], default: 'new')
}
```

#### SiteSettings Schema (for About page content)
```javascript
{
  _id: ObjectId,
  key: String (unique), // 'about_content'
  value: Object, // stores about page data
  updatedAt: Date
}
```

### 2. API Endpoints

#### Blog Posts
- `GET /api/posts` - Get all posts with optional category filter
- `GET /api/posts/featured` - Get featured posts only
- `GET /api/posts/:slug` - Get single post by slug
- `POST /api/posts` - Create new post (admin)
- `PUT /api/posts/:id` - Update post (admin)
- `DELETE /api/posts/:id` - Delete post (admin)

#### Categories
- `GET /api/categories` - Get all unique categories from posts

#### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `PUT /api/contact/:id/status` - Update message status (admin)

#### About Page
- `GET /api/about` - Get about page content
- `PUT /api/about` - Update about page content (admin)

### 3. Frontend Integration Changes

#### Remove Mock Dependencies
- Remove mock.js imports from all components
- Replace mock data calls with API calls using axios

#### API Integration Points

**HomePage.js:**
- Replace `mockBlogPosts` with `GET /api/posts`
- Replace `mockCategories` with `GET /api/categories`
- Featured posts from `GET /api/posts/featured`

**BlogPost.js:**
- Replace slug-based mock lookup with `GET /api/posts/:slug`
- Related posts from `GET /api/posts?category=${category}&exclude=${currentId}`

**AboutPage.js:**
- Replace `mockAboutContent` with `GET /api/about`

**ContactPage.js:**
- Form submission to `POST /api/contact`
- Real email notification (future enhancement)

**AdminPage.js:**
- Posts list from `GET /api/posts`
- Create post via `POST /api/posts`
- Update post via `PUT /api/posts/:id`
- Delete post via `DELETE /api/posts/:id`

### 4. Error Handling Strategy
- API error responses with proper HTTP status codes
- Frontend error boundaries and user-friendly error messages
- Loading states for all async operations
- Form validation on both frontend and backend

### 5. Data Migration
- Seed database with current mock blog posts
- Create initial about page content in database
- Set up admin user authentication (future enhancement)

### 6. Implementation Order
1. Backend models and basic CRUD endpoints
2. Replace frontend mock calls with API calls
3. Error handling and loading states
4. Admin functionality integration
5. Contact form email integration
6. Testing and validation

## Success Criteria
- All mock functionality replaced with real database operations
- Admin panel can create, edit, and delete posts
- Contact form stores messages in database
- About page content manageable through database
- Proper error handling and user feedback
- Responsive and performant user experience

## Notes
- Keep existing UI/UX unchanged during backend integration
- Maintain Turkish language content and interface
- Ensure mobile responsiveness is preserved
- Use existing shadcn UI components for consistency