import { Moon, Sun, Palette } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, themeName, setTheme } = useTheme();
  
  const themeOptions = Object.keys({ light: {}, dark: {}, beige: {}, rose: {} });
  
  const handleThemeChange = () => {
    const currentIndex = themeOptions.indexOf(themeName);
    const nextIndex = (currentIndex + 1) % themeOptions.length;
    setTheme(themeOptions[nextIndex]);
  };

  return (
    <button
      type="button"
      className={`p-2 rounded-lg ${theme.card} ${theme.border} border shadow-sm transition-all duration-200 hover:shadow-md`}
      onClick={handleThemeChange}
      title={`Current theme: ${theme.name}. Click to switch theme.`}
    >
      {themeName === 'light' && <Sun className="h-5 w-5 text-yellow-500" />}
      {themeName === 'dark' && <Moon className="h-5 w-5 text-blue-400" />}
      {themeName === 'beige' && <Palette className="h-5 w-5 text-amber-600" />}
      {themeName === 'rose' && <Palette className="h-5 w-5 text-rose-400" />}
    </button>
  );
}
