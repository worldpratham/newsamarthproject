import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function PageBanner({ title, subtitle, bgImage }: PageBannerProps) {
  return (
    <section className="relative h-[280px] md:h-[340px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : 'linear-gradient(135deg, #7f1d1d 0%, #1e293b 100%)',
        }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 text-shadow animate-fade-in-up">{title}</h1>
        {subtitle && (
          <p className="text-base md:text-lg text-dark-200 max-w-2xl mx-auto animate-fade-in-up">{subtitle}</p>
        )}
        <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-dark-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-white">{title}</span>
        </nav>
      </div>
    </section>
  );
}
