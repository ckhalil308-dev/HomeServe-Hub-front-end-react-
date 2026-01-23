    import { useState } from 'react';
    import { updateDemandeStatus } from '../../../api/Demande.Api';

    export default function Demande({ demande }) {
    const [currentStatus, setCurrentStatus] = useState(demande.status || 'En attente');
    const [finalStatus, setFinalStatus] = useState(demande.status || null);
    const handleSubmit = async (e) =>  {
        e.preventDefault();
        const statusData = { status: currentStatus };
        try{
            const response=await updateDemandeStatus( demande._id, statusData);
            console.log("Demande status updated:", response);
            setFinalStatus(currentStatus);

        }
        catch(error){
        console.error("Error updating demande status:", error);
        }}

    const firstLetter = demande.client.nom?.charAt(0).toUpperCase() || 'U';

    return (
        <div className="flex items-center justify-between gap-5 rounded-lg border border-gray-200 bg-white p-1">
        {/* Avatar */}
        <div className="flex h-12 w-12 flex -shrink-0 items-center justify-center rounded-full color2 text-white font-semibold text-lg">
            {firstLetter}
        </div>

        {/* Full Name */}
        <div className="flex-1 min-w-[150px]">
            <p className="text-xs font-medium text-gray-500">Client</p>
            <p className="text-sm font-semibold text-gray-900">{demande.client.nom}  {demande.client.prenom}</p>
        </div>

        {/* Service Title */}
        <div className="flex-1 min-w-[150px]">
            <p className="text-xs font-medium text-gray-500">Service</p>
            <p className="text-sm text-gray-900">{demande.service.titre}</p>
        </div>
            {/* Price */}
        <div className="flex-1 min-w-[100px]">
            <p className="text-xs font-medium text-gray-500">Prix</p>
            <p className="text-sm font-semibold text-gray-900">{demande.prix} dt</p>
        </div>

        {/* Status */}
        <div className="flex-1 min-w-[100px]">
            <p className="text-xs font-medium text-gray-500">Statut</p>
            {  finalStatus === 'En attente' && (
                <select 
                value={currentStatus}
                onChange={(e)=>setCurrentStatus(e.target.value)}
                
                className="mt-1 w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 disabled:opacity-50"
                >
                <option  value="En attente" disabled>En attente</option>  
                <option value="Approuve">Approuvé</option>
                <option value="Rejete">Rejeté</option>
                </select>)}


            { (finalStatus == 'Approuve' || finalStatus == 'Rejete') && (
            <p className={"mt-3 felx items-center text-sm font-semibold text-gray-900 capitalize text-center " + (currentStatus === 'Approuve' ?  'text-green-600 bg-green-100 rounded-lg w-20 p-1' : 'text-red-600 bg-red-100 rounded-lg w-15 p-1')}>{currentStatus}</p>
            )}
        </div>

    

        {/* Submit Button */}
        {finalStatus === 'En attente' && (
        <button 
            onClick={handleSubmit}
            className="flex-shrink-0 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
            Soumettre
            
            
        </button>
        )}
        </div>
    );
    }