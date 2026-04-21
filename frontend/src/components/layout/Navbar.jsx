import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Legal Application</p>
        <h2 className="text-lg font-semibold">Welcome back, {user?.name || 'User'}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={toggleTheme}>
          {theme === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" onClick={logout}>Logout</Button>
      </div>
    </header>
  );
}
