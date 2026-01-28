import React, { use } from 'react'
import { useState, useEffect } from 'react';
import { getPros } from '../../../api/Users.api';
import HeaderTabAdmin from './HeaderTabAdmin';
import Searchbar from './Searchbar';
import Pagination from './Pagination';
import AdminTableUsers from './AdminTableUsers';
function VerifierPro() {
    const [pros, setPros] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false); const [debouncedSearch, setDebouncedSearch] = useState(search);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400); // debounce delay
        return () => clearTimeout(timer);
    }, [search]);
    useEffect(() => {
        const fetchProsNonverifie = async () => {

            try {
                const data = await getPros(debouncedSearch, page);
                console.log("Pros non verifie fetched:", data);
                setPros(data.ProsNonVerifie);
                setTotalPages(data.TotalNonVerifie);


            } catch (error) {

            }
        }
        fetchProsNonverifie();
    }, [debouncedSearch, page]);
        const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
     const tabHeaders=[
    "Nom",
    "Prenom"  ,
    "Email",
    "spécialité",
    "Vérification"

  ]
    return (
       <>
         <div className="animate min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8"> 
            <HeaderTabAdmin role="verifier les professionnels" description="Verifier professionnels pour qu'ils soient conformes aux normes" />
             <Searchbar search={search} handleSearch={handleSearch} placeholder="Search professionals..." />
                <AdminTableUsers users={pros} loading={loading} tabHeaders={tabHeaders} />

               <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />

       </div>
       
       </>
    )
}

export default VerifierPro