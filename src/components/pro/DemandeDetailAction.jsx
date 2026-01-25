import React from 'react'

function DemandeDetailAction({ demande ,updateStatus,setIsApproved,isApproved,suggestedPrice,setSuggestedPrice,handleSavePrice,savingPrice,handleReject,Check}) {
  return (
    <>
      {demande.status === 'En attente' && (
              <>
                {!isApproved && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsApproved(true)}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-bold py-4 px-6 transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Accepter la demande
                    </button>
                    <button
                      onClick={handleReject}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold py-4 px-6 transition duration-200 flex items-center justify-center gap-2 border border-red-200"
                    >
                      Rejeter la demande
                    </button>
                  </div>
                )}

                {isApproved && (
                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Prix proposé (DT) *
                      </label>
                      <input
                        type="number"
                        value={suggestedPrice}
                        onChange={(e) => setSuggestedPrice(e.target.value)}
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-semibold text-lg"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <button
                      onClick={handleSavePrice}
                      disabled={savingPrice}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl font-bold py-4 px-6 transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {savingPrice ? 'Enregistrement...' : 'Confirmer'}
                    </button>

                    <button
                      onClick={() => setIsApproved(false)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold py-4 px-6 transition duration-200"
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </>
            )}
    </>
  )
}

export default DemandeDetailAction