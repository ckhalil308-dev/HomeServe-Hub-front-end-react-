import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDemandeById, ProposerPrix, updateDemandeStatus } from '../../../api/Demande.Api';
import { User, MapPin, Clock, AlertCircle, Check, ArrowLeft, XCircle } from 'lucide-react';
import { set } from 'lodash';
import DemandeDetailHeader from './DemandeDetail-header';
import DemandeDetailsGrid from './DemandeDetailsGrid';
import Demande from './Demande';
import DemandeDetailAction from './DemandeDetailAction';

function DemandeDetails() {
  const id = useParams().id;
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedPrice, setSuggestedPrice] = useState('');
  const [savingPrice, setSavingPrice] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  // Added state for clean notifications
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        setLoading(true);
        const data = await getDemandeById(id);
        setDemande(data);
        setSuggestedPrice(data.prixPropose || '');
        setIsApproved(data.isApproved || false);
      } catch (error) {
        console.error('Erreur lors de la récupération de la demande:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDemande();
  }, [id]);

  const handleSavePrice = async (e) => {
    e.preventDefault();
    setSavingPrice(true);
    setStatusMsg({ text: '', type: '' });

    if (!suggestedPrice || isNaN(suggestedPrice) || Number(suggestedPrice) <= 0) {
      setStatusMsg({ text: 'Veuillez entrer un prix valide', type: 'error' });
      setSavingPrice(false);
      return;
    }
    if (suggestedPrice < demande.service.prix) {
      setStatusMsg({ text: `Le prix proposé doit être au moins égal au prix de base: ${demande.service.prix}dt`, type: 'error' });
      setSavingPrice(false);
      return;
    }

    try {
      await ProposerPrix(id, { prix: suggestedPrice });
      setStatusMsg({ text: 'Prix proposé avec succès ! Redirection...', type: 'success' });
       navigate('/pro/mes-demandes')
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error.response.data);
      setStatusMsg({ text: 'Erreur lors de la sauvegarde du prix', type: 'error' });
    } finally {
      setSavingPrice(false);
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    setStatusMsg({ text: '', type: '' });
    try {
      await updateDemandeStatus(id, { status: 'Rejete' });
      setStatusMsg({ text: 'Status mis à jour. Redirection...', type: 'success' });
      setTimeout(() => navigate('/pro/mes-demandes'), 1500);
    } catch (error) {
      console.error('Erreur lors du rejet:', error.response.data);
      setStatusMsg({ text: 'Erreur lors du rejet de la demande', type: 'error' });
    }
  };

  const date = new Date(demande?.dateIntervention);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Chargement de la demande...</div>;
  }

  if (!demande) {
    return <div className="flex items-center justify-center h-screen text-red-600">Erreur: Demande non trouvée</div>;
  }

  return (
    <div className="animate min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => {
            if (demande.status === "Approuve") { navigate('/pro/demande-en-cours'); }
            else if (demande.status === "En attente") { navigate('/pro/mes-demandes'); }
            else { navigate('/pro/demande-history'); }
          }}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        {/* Status Alerts */}
        {demande.status === 'En attente' && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl flex gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 text-sm">Demande en attente</h3>
              <p className="text-amber-700 text-xs mt-0.5">Proposez un prix pour répondre à cette demande</p>
            </div>
          </div>
        )}

        {demande.status === 'Approuve' && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex gap-3 shadow-sm">
            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-900 text-sm">Demande approuvée</h3>
              <p className="text-emerald-700 text-xs mt-0.5">Contactez le client pour finaliser l'intervention</p>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* <DemandeDetailHeader demande={demande} /> */}

          <div className="p-10">
            {/* Client Info */}
            <div className="mb-10 pb-10 border-b border-gray-200 flex items-center gap-5">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md text-white">
                <User className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Demande de</p>
                <h1 className="text-3xl font-bold text-gray-950">
                  {demande.client?.nom} {demande.client?.prenom}
                </h1>
              </div>
            </div>

            {/* Service Title */}
            <div className="mb-10">
              <h2 className="text-lg font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Description du service</h2>
              <p className="text-gray-700 leading-relaxed text-base">{demande.description}</p>
            </div>

            {/* Details Grid */}
            <DemandeDetailsGrid demande={demande} formattedDate={formattedDate} />

            {/* Clean Feedback Message */}
            {statusMsg.text && (
              <div className={`mt-8 p-4 rounded-xl flex items-center gap-3 border ${
                statusMsg.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
                {statusMsg.type === 'error' ? <XCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                <span className="font-medium text-sm">{statusMsg.text}</span>
              </div>
            )}

            {/* Action Section */}
            <DemandeDetailAction
              demande={demande}
              updateStatus={updateDemandeStatus}
              setIsApproved={setIsApproved}
              isApproved={isApproved}
              suggestedPrice={suggestedPrice}
              setSuggestedPrice={setSuggestedPrice}
              handleSavePrice={handleSavePrice}
              savingPrice={savingPrice}
              handleReject={handleReject}
              Check={Check}
              setStatusMsg={setStatusMsg}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemandeDetails;