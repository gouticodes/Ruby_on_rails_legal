import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const baseLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/cases', label: 'Cases' },
  { to: '/documents', label: 'Documents' },
  { to: '/profile', label: 'Profile' },
];

export default function Sidebar() {
  const { isAdmin } = useAuth();
  const links = isAdmin ? [...baseLinks, { to: '/audit-logs', label: 'Audit Logs' }] : baseLinks;

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="mb-8 text-xl font-bold text-brand-600">LegalOps</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-brand-100' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
