import React from 'react'
import { useState ,useEffect} from 'react'
import { getPros } from '../../../api/Users.api'
import AdminTableUsers from './AdminTableUsers';
import HeaderTabAdmin from './HeaderTabAdmin';
import Pagination from './Pagination';
import Searchbar from './Searchbar';
import { set } from 'lodash';


function ListePro() {
      const [pros, setPros] = useState([]);
      const [search, setSearch] = useState('');
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [loading, setLoading] = useState(false);
        const [debouncedSearch, setDebouncedSearch] = useState(search);
        useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedSearch(search);
        }, 400); // debounce delay
        return () => clearTimeout(timer);
      }, [search]);
      
        const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
   const tabHeaders=[
    "Nom",
    "Prenom"  ,
    "Email",
    "spécialité",
    "Statut",
       "Modifier", 
        "Bannir"
  ]
    
      useEffect(() => {
        const fetchPros = async () => {
          setLoading(true);
          try {
            const res = await getPros(debouncedSearch, page);
            setTotalPages(res.totalPages);
            console.log("Pros fetched:", res);
            setPros(res.allPros);
            setPage(res.currentPage);
            
          } catch (error) {
            console.error('Failed to fetch pros:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchPros();
      }, [debouncedSearch, page]);
       const bannerPro=(userID)=>{
    setPros(pros.filter(pro => pro._id !== userID));
  }
    const updatePro = (updatedUser) => {
    setPros(pros.map(pro => pro._id === updatedUser._id ? updatedUser : pro));
    if (updatedUser.isBanned) {
       setPros(pros.filter(pro => pro._id !== updatedUser._id));
    }
    if(updatedUser.role === 'client') {
       setPros(pros.filter(pro => pro._id !== updatedUser._id));
    }
}
  return (
    <>
      <div className="animate min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8"> 

      <HeaderTabAdmin role="professionnels" description="Manage and view all your professionals" />
       <Searchbar search={search} handleSearch={handleSearch} placeholder="Search professionals..." />
    <AdminTableUsers users={pros} loading={loading} tabHeaders={tabHeaders} bannerPro={bannerPro} modifierPro={updatePro} />
    <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
    </div>
    </>
  )
}

export default ListePro