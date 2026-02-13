import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { getClients } from '../../../api/Users.api';
import AdminDash from './AdminDash';
import AdminTableUsers from './AdminTableUsers';
import HeaderTabAdmin from './HeaderTabAdmin';
import Pagination from './Pagination';
import Searchbar from './Searchbar';
import { set } from 'lodash';

function ListeClient() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
 
  const [debouncedSearch, setDebouncedSearch] = useState(search);
   const tabHeaders=[
    "Nom",
    "Prenom"  ,
    "Email",
    "Modifier", 
    "Bannir"
  ]
  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 400); // debounce delay
 

  return () => clearTimeout(timer);
}, [search]);
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const res = await getClients(debouncedSearch, page);
        setClients(res.clients);
        setPage(res.currentPage);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [debouncedSearch, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const bannerClient=(userID)=>{
    setClients(clients.filter(client => client._id !== userID));
  }
  
  const updateUser = (updatedUser) => {
    setClients(clients.map(client => client._id === updatedUser._id ? updatedUser : client));
    if (updatedUser.isBanned) {
       setClients(clients.filter(client => client._id !== updatedUser._id));
    }
    if(updatedUser.role === 'professionnel') {
       setClients(clients.filter(client => client._id !== updatedUser._id));
    }
}
  

  return (
    <div className="animate min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <HeaderTabAdmin role="client" description="Manage and view all your clients" />

        {/* Search Bar */}
         <Searchbar   search={search} handleSearch={handleSearch} placeholder="Search clients..." />

        {/* Table */}
        <AdminTableUsers users={clients} loading={loading} tabHeaders={tabHeaders} bannerClient={bannerClient} modifierClient={updateUser} />

        {/* Pagination */}
       <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

export default ListeClient;