import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function PageBanner({ title, subtitle, bgImage }: PageBannerProps) {
  return (
    <section className="relative h-[200px] sm:h-[260px] md:h-[320px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : 'linear-gradient(135deg, #7f1d1d 0%, #1e293b 100%)',
        }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 text-shadow animate-fade-in-up leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm md:text-base text-dark-200 max-w-2xl mx-auto animate-fade-in-up line-clamp-2 px-2">
            {subtitle}
          </p>
        )}
        <nav className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-xs sm:text-sm text-dark-300">
          <Link to="/" className="hover:text-white transition-colors shrink-0">Home</Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-white font-medium truncate max-w-[180px] sm:max-w-md">{title}</span>
        </nav>
      </div>
    </section>
  );
}
