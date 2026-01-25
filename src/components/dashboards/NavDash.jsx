import { Outlet, Link, useLocation } from 'react-router-dom';
import { FileText, Briefcase, User, History, LogOut, Menu, X } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '../contexte/context';
import { useState } from 'react';

export default function SidebarNavbar() {
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/pro/mes-demandes', label: 'Mes Demandes', icon: FileText, },
     { href: '/pro/demande-en-cours', label: 'Demandes en cours', icon: FileText, },
    { href: '/pro/services', label: 'Mes Services', icon: Briefcase, },
   
    { href: '/pro/profile', label: 'Mon Profile', icon: User, },
    { href: '/pro/demande-history', label: 'Historique des demandes', icon: History,},
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className=" animate flex flex-start  h-screen  ">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white  border-[2px] border-teal-500  flex flex-col transition-transform duration-300 z-40 lg:relative lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-6 ">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* User Profile Card */}
          <div className="mr-10 ">
            <div className="flex flex-start items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-white">
                  {user.nom?.charAt(0)}{user.prenom?.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-sm truncate">
                  {user.nom} {user.prenom}
                </p>
                <p className="text-xs text-teal-600 font-medium capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

  
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4  mt-4 space-y-15 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center t gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-teal-50  text-teal-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  active ? 'text-teal-600' : 'group-hover:text-teal-600'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className={`font-s text-sm truncate ${active ? 'text-teal-700' : ''}`}>
                    {item.label}
                  </p>
                  <p className={`text-xs truncate ${active ? 'text-teal-600' : 'text-slate-500'}`}>
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 lg:hidden z-50 p-3 rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <main className=" animate flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}