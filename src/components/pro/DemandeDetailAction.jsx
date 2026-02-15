import React from 'react'

function DemandeDetailAction({ 
  demande, setIsApproved, isApproved, suggestedPrice, setSuggestedPrice, 
  handleSavePrice, savingPrice, handleReject, Check, setStatusMsg 
}) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {demande.status === 'En attente' && (
        <div className="animate-in fade-in duration-500">
          {!isApproved ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsApproved(true)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-black py-5 px-8 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 uppercase tracking-widest text-xs active:scale-95"
              >
                <Check className="w-5 h-5" />
                Accepter le dossier
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-white hover:bg-rose-50 text-rose-600 border-2 border-gray-100 hover:border-rose-100 rounded-2xl font-black py-5 px-8 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs active:scale-95"
              >
                Décliner
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-[2rem] border-2 border-dashed border-gray-200">
              <div className="mb-8 text-center">
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Votre Proposition Financière
                </label>
                <div className="relative inline-block w-full max-w-[240px]">
                  <input
                    type="number"
                    value={suggestedPrice}
                    onChange={(e) => setSuggestedPrice(e.target.value)}
                    className="w-full px-6 py-5 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-black text-3xl text-center outline-none"
                    placeholder={demande.prix ? demande.prix : 'Prix en DT'}
                    min="0"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300">DT</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSavePrice}
                  disabled={savingPrice}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-2xl font-black py-5 px-8 shadow-lg shadow-blue-100 transition-all uppercase tracking-widest text-sm"
                >
                  {savingPrice ? 'Envoi en cours...' : 'Envoyer la proposition'}
                </button>
                <button
                  onClick={() => { setIsApproved(false); setStatusMsg({ text: '', type: '' }); }}
                  className="w-full py-4 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  Annuler et revenir
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DemandeDetailAction;