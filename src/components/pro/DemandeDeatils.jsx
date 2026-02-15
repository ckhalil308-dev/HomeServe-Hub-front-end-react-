import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDemandeById, ProposerPrix, updateDemandeStatus } from '../../../api/Demande.Api';
import { User, ArrowLeft, AlertCircle, Check, XCircle } from 'lucide-react';
import DemandeDetailHeader from './DemandeDetail-header';
import DemandeDetailsGrid from './DemandeDetailsGrid';
import DemandeDetailAction from './DemandeDetailAction';

function DemandeDetails() {
  const { id } = useParams();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedPrice, setSuggestedPrice] = useState('');
  const [savingPrice, setSavingPrice] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
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
        console.error('Erreur:', error);
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
      setTimeout(() => navigate('/pro/mes-demandes'), 1500);
    } catch (error) {
      setStatusMsg({ text: 'Erreur lors de la sauvegarde', type: 'error' });
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
      setStatusMsg({ text: 'Erreur lors du rejet', type: 'error' });
    }
  };

  const formattedDate = demande?.dateIntervention ? new Date(demande.dateIntervention).toLocaleDateString('fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : '';

  if (loading) return <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-500 font-medium">Chargement du dossier...</div>;
  if (!demande) return <div className="flex items-center justify-center h-screen text-red-600 font-bold">Demande introuvable</div>;

  return (
    <div className="animate min-h-screen bg-[#F8FAFC] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => {
            if (demande.status === "Approuve") navigate('/pro/demande-en-cours');
            else if (demande.status === "En attente") navigate('/pro/mes-demandes');
            else navigate('/pro/demande-history');
          }}
          className="group flex items-center gap-2 mb-6 text-gray-500 hover:text-gray-900 transition-all text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour
        </button>

        <div className="flex flex-col gap-6">
          {/* Status Banners */}
          {demande.status === 'En attente' && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
              <div className="bg-amber-100 p-2 rounded-xl text-amber-600"><AlertCircle size={20} /></div>
              <p className="text-amber-800 text-sm font-semibold italic">Cette demande attend votre proposition tarifaire.</p>
            </div>
          )}

          {/* Main Content Card */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            {/* <DemandeDetailHeader demande={demande} /> */}

            <div className="p-8 md:p-12">
              {/* Header: Client Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-gradient-to-tr from-gray-900 to-gray-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-gray-300 text-white">
                    <User size={32} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Dossier Client</span>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mt-1">
                      {demande.client?.nom} {demande.client?.prenom}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Body: Description */}
              <div className="mb-12">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Description du besoin</h3>
                <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-6 rounded-2xl border-l-4 border-blue-500 font-medium italic">
                  "{demande.description}"
                </p>
              </div>

              {/* Grid: Details */}
              <DemandeDetailsGrid demande={demande} formattedDate={formattedDate} />

              {/* Notifications */}
              {statusMsg.text && (
                <div className={`mt-8 p-5 rounded-2xl flex items-center gap-3  border-2 ${
                  statusMsg.type === 'error' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                }`}>
                  {statusMsg.type === 'error' ? <XCircle size={24} /> : <Check size={24} />}
                  <span className="font-bold tracking-tight">{statusMsg.text}</span>
                </div>
              )}

              {/* Footer: Actions */}
              <div className="mt-12 pt-10 border-t border-gray-100">
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
      </div>
    </div>
  );
}

export default DemandeDetails;