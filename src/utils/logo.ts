export const LOGO_DEV_TOKEN = 'pk_Y-yYgAapRX6Owwkcj7-BiA';

export interface LogoObject {
  light: string;
  dark: string;
}

export const getLogoUrl = (
  domain: string, 
  size: number = 32, 
  theme: 'light' | 'dark' | 'auto' = 'auto', 
  retina: boolean = false,
  logoObject?: LogoObject
) => {
  // If logo object is provided, use the appropriate logo file
  if (logoObject) {
    const logoPath = theme === 'dark' ? logoObject.dark : logoObject.light;
    return logoPath.startsWith('/') ? logoPath : `/${logoPath}`;
  }
  
  // Otherwise, use logo.dev as before
  const params = new URLSearchParams({
    token: LOGO_DEV_TOKEN,
    size: size.toString(),
    format: 'png',
    theme,
    ...(retina && { retina: 'true' })
  });
  
  return `https://img.logo.dev/${domain}?${params.toString()}`;
};
