import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-5xl font-bold">404</h1>
      <p>Page not found.</p>
      <Link className="text-brand-600" to="/">Go home</Link>
    </div>
  );
}
