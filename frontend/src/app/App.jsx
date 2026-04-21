import { Suspense } from 'react';
import AppRouter from '../router/AppRouter';

export default function App() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading page...</div>}>
      <AppRouter />
    </Suspense>
  );
}
