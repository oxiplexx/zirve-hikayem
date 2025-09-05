import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Blog Posts API
export const blogAPI = {
  // Get all posts with optional filtering
  getPosts: async (category = null, featured = null) => {
    const params = new URLSearchParams();
    if (category && category !== 'Tümü') params.append('category', category);
    if (featured !== null) params.append('featured', featured.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/posts?${queryString}` : '/posts';
    
    const response = await api.get(url);
    return response.data;
  },

  // Get featured posts only
  getFeaturedPosts: async () => {
    const response = await api.get('/posts/featured');
    return response.data;
  },

  // Get single post by slug
  getPostBySlug: async (slug) => {
    const response = await api.get(`/posts/${slug}`);
    return response.data;
  },

  // Create new post (admin)
  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Update post (admin)
  updatePost: async (postId, postData) => {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
  },

  // Delete post (admin)
  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

// Contact API
export const contactAPI = {
  // Submit contact form
  submitMessage: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },

  // Get all messages (admin)
  getMessages: async (status = null) => {
    const params = status ? `?status=${status}` : '';
    const response = await api.get(`/contact${params}`);
    return response.data;
  },

  // Update message status (admin)
  updateMessageStatus: async (messageId, status) => {
    const response = await api.put(`/contact/${messageId}/status?status=${status}`);
    return response.data;
  },
};

// About API
export const aboutAPI = {
  // Get about content
  getAboutContent: async () => {
    const response = await api.get('/about');
    return response.data;
  },

  // Update about content (admin)
  updateAboutContent: async (contentData) => {
    const response = await api.put('/about', contentData);
    return response.data;
  },
};

// Generic error handler
export const handleAPIError = (error, defaultMessage = 'Bir hata oluştu') => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.detail || error.response.data?.message || defaultMessage;
    return message;
  } else if (error.request) {
    // Network error
    return 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.';
  } else {
    // Other error
    return error.message || defaultMessage;
  }
};

export default api;