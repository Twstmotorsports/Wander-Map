import { useColorScheme } from 'react-native';

export type AppTheme = {
  background: string;
  surface: string;
  primary: string;
  textPrimary: string;
  textSecondary: string;
  statusBarStyle: 'light' | 'dark';
};

const lightTheme: AppTheme = {
  background: '#F9FAFB',
  surface: '#FFFFFF',
  primary: '#F97316',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  statusBarStyle: 'dark',
};

const darkTheme: AppTheme = {
  background: '#020617',
  surface: '#0F172A',
  primary: '#F97316',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  statusBarStyle: 'light',
};

export function useAppTheme(): AppTheme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
