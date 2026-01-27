import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { getClients } from '../../../api/Users.api';
import AdminDash from './AdminDash';
import AdminTableUsers from './AdminTableUsers';
import HeaderTabAdmin from './HeaderTabAdmin';
import Pagination from './Pagination';
import Searchbar from './Searchbar';

function ListeClient() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const res = await getClients(search, page);
        setClients(res.clients);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [search, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="animate min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <HeaderTabAdmin role="client" description="Manage and view all your clients" />

        {/* Search Bar */}
         <Searchbar value={search} onChange={handleSearch} placeholder="Search clients..." />

        {/* Table */}
        <AdminTableUsers users={clients} loading={loading} />

        {/* Pagination */}
       <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

export default ListeClient;