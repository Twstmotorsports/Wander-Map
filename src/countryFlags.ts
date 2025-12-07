const COUNTRY_FLAG_MAP: Record<string, string> = {
  japan: '🇯🇵',
  philippines: '🇵🇭',
  'united states': '🇺🇸',
  usa: '🇺🇸',
  canada: '🇨🇦',
  france: '🇫🇷',
  italy: '🇮🇹',
  germany: '🇩🇪',
  spain: '🇪🇸',
  'united kingdom': '🇬🇧',
  uk: '🇬🇧',
  australia: '🇦🇺',
  thailand: '🇹🇭',
  singapore: '🇸🇬',
  malaysia: '🇲🇾',
  china: '🇨🇳',
  korea: '🇰🇷',
  'south korea': '🇰🇷',
  'north korea': '🇰🇵',
  vietnam: '🇻🇳',
  indonesia: '🇮🇩',
  india: '🇮🇳',
};

export const getCountryFlag = (country: string): string | null => {
  const key = country.trim().toLowerCase();
  if (!key) {
    return null;
  }
  return COUNTRY_FLAG_MAP[key] ?? '🌍';
};
