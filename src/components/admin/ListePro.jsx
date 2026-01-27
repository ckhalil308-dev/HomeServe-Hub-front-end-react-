import React from 'react'
import { useState ,useEffect} from 'react'
import { getPros } from '../../../api/Users.api'
import AdminTableUsers from './AdminTableUsers';
import HeaderTabAdmin from './HeaderTabAdmin';
import Pagination from './Pagination';
import Searchbar from './Searchbar';


function ListePro() {
      const [pros, setPros] = useState([]);
      const [search, setSearch] = useState('');
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [loading, setLoading] = useState(false);
        const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
    
      useEffect(() => {
        const fetchPros = async () => {
          setLoading(true);
          try {
            const res = await getPros(search, page);
            console.log("Pros fetched:", res);
            setPros(res.allPros);
            setTotalPages(res.totalPages);
          } catch (error) {
            console.error('Failed to fetch pros:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchPros();
      }, [search, page]);
  return (
    <>
      <div className="animate min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8"> 

      <HeaderTabAdmin role="professionnel" description="Manage and view all your professionals" />
       <Searchbar value={search} onChange={handleSearch} placeholder="Search professionals..." />
    <AdminTableUsers users={pros} loading={loading} />
    <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
    </div>
    </>
  )
}

export default ListePro