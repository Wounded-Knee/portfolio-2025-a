export const LOGO_DEV_TOKEN = 'pk_Y-yYgAapRX6Owwkcj7-BiA';

export const getLogoUrl = (domain: string, size: number = 32, theme: 'light' | 'dark' | 'auto' = 'auto', retina: boolean = false) => {
  const params = new URLSearchParams({
    token: LOGO_DEV_TOKEN,
    size: size.toString(),
    format: 'png',
    theme,
    ...(retina && { retina: 'true' })
  });
  
  return `https://img.logo.dev/${domain}?${params.toString()}`;
};
