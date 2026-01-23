        import React, { useEffect, useState } from 'react';
        import { Navigate } from 'react-router-dom';
        import { GetMe } from '../../api/Users.api';
        import { useUser } from '../components/contexte/context';

        function Privateguards({ children, roles }) { // On récupère roles ici
            const {user,loading }= useUser();
            if (loading) {
         return (
             <div className="flex h-screen items-center justify-center">
             <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
           );
          }
            if (!user) {
                return <Navigate to="/" />;
            }

        
            if (roles && !roles.includes(user?.role)) {
                return <Navigate to="/" />; 
            }


            return children;
        }

        export default Privateguards;