export const getSiteURL = () => {
  // First try to get the URL from environment variable
  let url = process.env.NEXT_PUBLIC_SITE_URL;
  
  // If we're in the browser and don't have the env var, use the current origin
  if (typeof window !== 'undefined' && !url) {
    url = window.location.origin;
  }
  
  // Remove trailing slash if it exists
  url = url?.replace(/\/$/, '');
  
  // If we still don't have a URL, default to localhost
  if (!url) {
    url = 'http://localhost:3000';
  }
  
  return url;
};

export const getAbsoluteURL = (path: string) => {
  return `${getSiteURL()}${path.startsWith('/') ? path : `/${path}`}`;
};
