export const extractDomain = (url: string | null): string | null => {
  if (!url) return null;
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    // If URL parsing fails, try to extract domain manually
    const domainMatch = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/i);
    return domainMatch ? domainMatch[1] : null;
  }
};
