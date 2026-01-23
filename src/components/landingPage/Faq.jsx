import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const nav = useNavigate();

  const faqs = [
    {
      question: "Comment choisir un service ?",
      answer: "Consultez notre page de services où tous les types d'interventions sont listés (plomberie, électricité, etc.). Cliquez sur le service souhaité et remplissez le formulaire de demande avec les détails de votre besoin."
    },
    {
      question: "Comment les professionnels proposent-ils leurs prix ?",
      answer: "Après réception de votre demande, plusieurs professionnels vous répondront avec leurs devis détaillés. Vous pouvez comparer les prix, les délais et les avis avant de choisir le professionnel qui vous convient le mieux."
    },
    {
      question: "Où puis-je suivre ma demande ?",
      answer: "Un espace de suivi dédié vous permet de consulter l'état de votre demande en temps réel. Vous y verrez tous les professionnels qui ont répondu, leurs devis respectifs et l'historique de vos échanges."
    },
    {
      question: "Comment fonctionne le statut de ma demande ?",
      answer: "Votre demande passe par plusieurs statuts : 'En attente de réponses' → 'Réponses reçues' → 'Service en cours' → 'Terminé'. Vous recevez des notifications à chaque changement de statut."
    },
    {
      question: "Comment accepter une offre d'un professionnel ?",
      answer: "Dans votre espace de suivi, sélectionnez le devis qui vous plaît et cliquez sur 'Accepter l'offre'. Le professionnel sera notifié et vous contactera pour convenir des détails et de la date d'intervention."
    },
    {
      question: "Puis-je voir les avis et commentaires des professionnels ?",
      answer: "Oui ! Chaque professionnel a un profil avec ses avis clients, ses certifications et son expérience. Vous pouvez consulter ces informations avant de sélectionner une offre."
    },
    {
      question: "Comment puis-je communiquer avec le professionnel choisi ?",
      answer: "Un système de messagerie intégré vous permet de communiquer directement avec le professionnel. Vous pouvez poser des questions, confirmer les détails et suivre la progression du travail."
    },
   
  ];

  return (
    <div className="  py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Questions Fréquemment Posées
          </h1>
          <p className="text-lg text-slate-600">
            Trouvez les réponses sur notre plateforme de services
          </p>
          <div className="h-1 w-24 bg-blue-900 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-900"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
              >
                <span className="text-left font-semibold text-slate-900 text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-blue-900 flex-shrink-0 ml-4 transition-transform duration-300 ease-in-out ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 transition-all duration-3000 ease-in-out">
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-slate-700 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-14 color2 bg from-blue-900 to-blue-800 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-3">
            Prêt à commencer ?
          </h2>
          <p className="text-blue-100 mb-6">
            Consultez nos services et trouvez le professionnel qu'il vous faut
          </p>
          <button onClick={() => nav('/services')}     className=" bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-700 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.03]">
            Voir les services
          </button>
        </div>
      </div>
    </div>
  );
} 