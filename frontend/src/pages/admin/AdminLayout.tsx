import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  HeartHandshake,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import {
  isAuthenticated,
  getStoredAdminUser,
  logoutAdmin,
  getAdminProfile,
  AdminUser
} from '@/services/adminApi';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getStoredAdminUser());

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { state: { from: location }, replace: true });
      return;
    }

    getAdminProfile()
      .then((user) => setAdminUser(user))
      .catch(() => {
        // If token expired
        logoutAdmin();
        navigate('/admin/login', { replace: true });
      });
  }, [navigate, location]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logoutAdmin();
      navigate('/admin/login', { replace: true });
    }
  };

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/admin/courses',
      label: 'Courses Manager',
      icon: BookOpen,
      badge: 'CRUD'
    },
    {
      to: '/admin/enrollments',
      label: 'Student Admissions',
      icon: GraduationCap,
      badge: 'Live'
    },
    {
      to: '/admin/donations',
      label: 'Donations & 80G',
      icon: HeartHandshake,
      badge: null
    },
    {
      to: '/admin/leads',
      label: 'Volunteers & Queries',
      icon: MessageSquare,
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 text-white border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-bold text-white shadow">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight">Samarth Admin</div>
            <div className="text-[10px] text-amber-400 font-medium">BDSN Trust Portal</div>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="px-6 py-5 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight tracking-tight text-white">
                Samarth Bharat
              </h2>
              <span className="inline-block text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white font-mono uppercase tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / User Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/10">
              {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {adminUser?.name || 'Administrator'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {adminUser?.email || 'admin@samarthbharat.org'}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Live Website
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 min-h-screen">
        {/* Top Navbar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span>
            <span>/</span>
            <span className="font-semibold text-slate-800 capitalize">
              {location.pathname.replace('/admin/', '').replace('/admin', 'Dashboard') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Website
            </a>
            <div className="h-4 w-px bg-slate-200" />
            <div className="text-xs font-medium text-slate-600">
              Role: <span className="font-semibold text-slate-900 capitalize">{adminUser?.role || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <div className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
