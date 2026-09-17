import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-dark-50">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-dark-800 mb-3">Page Not Found</h2>
        <p className="text-dark-500 mb-8 max-w-md mx-auto">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          <Home size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
