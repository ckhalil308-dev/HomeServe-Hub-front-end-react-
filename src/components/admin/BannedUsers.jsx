    import React from 'react'
    import HeaderTabAdmin from './HeaderTabAdmin';
    import Searchbar from './Searchbar';
    import AdminTableUsers from './AdminTableUsers';
    import Pagination from './Pagination';
    import { getBannedUsers } from '../../../api/Users.api';
    import { useState ,useEffect} from 'react'
    import { i, s } from 'motion/react-client';

    function BannedUsers() {
        const [UsersBanned, setUsersBanned] = useState([]);
        const [search, setSearch] = useState('');
        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const [loading, setLoading] = useState(false);
        const [debouncedSearch, setDebouncedSearch] = useState(search);
        const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };
        const tabHeaders=[
        "Nom",
        "Prenom"  ,
        "Email",
        "role",
        "Modifier", 
          
    ]
        useEffect(() => {
                const timer = setTimeout(() => {
                setDebouncedSearch(search);
                }, 400); // debounce delay
                return () => clearTimeout(timer);
            }, [search]);
            useEffect(() => {
            const fetchBannedUsers = async () => {
                setLoading(true);
                try {
                    const res=await getBannedUsers(debouncedSearch,page);
                    setTotalPages (res.totalPages);
                    console.log("Banned Users fetched:", res);
                    setUsersBanned (res.bannedUsers);
                    setPage(res.currentPage);
                } catch (error) {
                    console.error('Failed to fetch banned users:', error);
                } finally {
                    setLoading(false);
                }
            }
            fetchBannedUsers();
        }, [debouncedSearch, page]);
    return (

        <div className="animate min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8"> 

        <HeaderTabAdmin role="utilisateur Banni" description="Manage and view all your banned users" />
            <Searchbar search={search} handleSearch={handleSearch} placeholder="Search banned users..." />
            <AdminTableUsers users={UsersBanned} loading={loading} tabHeaders={tabHeaders} />
        <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
        </div>
    )
    }

    export default BannedUsers