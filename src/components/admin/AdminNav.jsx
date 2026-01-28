import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, Settings, LogOut, ShieldCheck, Briefcase, BanIcon } from 'lucide-react';

 
function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();
   const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  // Fonction pour ajouter une classe active au lien actuel
  const isActive = (path) => location.pathname.includes(path) ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white";

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Vérifier Pros', path: '/admin/verifier-pros', icon: <ShieldCheck size={20} /> },
    { name: 'Liste clients', path: '/admin/liste-clients', icon: <Users size={20} /> },
    { name: 'Liste pros', path: '/admin/liste-pros', icon: <Briefcase size={20} /> },
    { name: 'Demandes', path: '/admin/liste-demandes', icon: <ClipboardList size={20} /> },
    { name: 'Utilisateurs bannis', path: '/admin/BannedUsers', icon: <BanIcon size={20} /> },
    { name: 'Paramètres', path: '/admin/Parametre', icon: <Settings size={20} /> 
      },

  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR FIXED */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        {/* Logo / Titre */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <ShieldCheck className="text-blue-500" size={28} />
          <span className="text-xl font-bold tracking-tight">AdminHub</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)}`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Pied de la Sidebar */}
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* CONTENU PRINCIPAL (À droite de la sidebar) */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet /> {/* C'est ici que s'afficheront AdminDashboard, AdminUsers, etc. */}
        </div>
      </main>
    </div>
  );
}

export default AdminNav;