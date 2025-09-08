import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics Measurement ID - replace with your actual GA4 ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual ID

// Initialize Google Analytics
export const initGA = () => {
  // Load gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_title: document.title,
      page_location: window.location.href,
      cookie_flags: 'secure;samesite=none'
    });
  `;
  document.head.appendChild(script2);

  // Make gtag available globally
  window.gtag = window.gtag || function() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  };
};

// Track page views
export const trackPageView = (path, title) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track blog post reads
export const trackBlogRead = (postTitle, category, readTime) => {
  trackEvent('blog_read', 'engagement', postTitle, {
    custom_parameters: {
      article_category: category,
      reading_time: readTime
    }
  });
};

// Track form submissions
export const trackFormSubmission = (formType, success = true) => {
  trackEvent('form_submit', 'conversion', formType, {
    custom_parameters: {
      success: success
    }
  });
};

// Track social media clicks
export const trackSocialClick = (platform, location) => {
  trackEvent('social_click', 'engagement', platform, {
    custom_parameters: {
      click_location: location
    }
  });
};

// Track admin actions
export const trackAdminAction = (action, details) => {
  trackEvent('admin_action', 'admin', action, {
    custom_parameters: {
      details: details
    }
  });
};

// Track search actions (if search feature is added)
export const trackSearch = (searchTerm, resultsCount) => {
  trackEvent('search', 'engagement', searchTerm, {
    custom_parameters: {
      results_count: resultsCount
    }
  });
};

// Track file downloads (if any)
export const trackDownload = (fileName, fileType) => {
  trackEvent('file_download', 'engagement', fileName, {
    custom_parameters: {
      file_type: fileType
    }
  });
};

// Hook for automatic page view tracking
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title;
    trackPageView(path, title);
  }, [location]);
};

// Privacy-friendly analytics component
const GoogleAnalytics = () => {
  usePageTracking();
  
  useEffect(() => {
    // Initialize GA on component mount
    if (!window.gtag) {
      initGA();
    }
  }, []);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;