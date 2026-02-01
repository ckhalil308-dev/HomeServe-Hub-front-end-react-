import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const nav = useNavigate();

const faqs = [
  {
    question: "Comment l'IA m'aide-t-elle à trouver un service ?",
    answer: "Grâce à notre technologie intelligente (Groq), décrivez simplement votre problème. L'IA analyse votre texte et vous oriente automatiquement vers la catégorie de service idéale pour résoudre votre souci."
  },
  {
    question: "Comment puis-je contacter le professionnel ?",
    answer: "Pour votre sécurité, vos coordonnées restent privées. Le professionnel pourra voir votre numéro de téléphone et vous appeler uniquement après que vous aurez accepté sa proposition de prix."
  },
  {
    question: "Les professionnels sont-ils fiables ?",
    answer: "Oui. Chaque professionnel est vérifié manuellement par notre administrateur avant de pouvoir postuler. De plus, vous pouvez consulter les avis laissés par d'autres clients pour faire votre choix."
  },
  {
    question: "Comment se déroule la fixation du prix ?",
    answer: "Une fois votre demande envoyée, le professionnel l'analyse et propose un prix via son dashboard. Vous recevez cette offre et vous êtes libre de l'accepter ou de la refuser directement depuis votre espace."
  },
  {
    question: "Comment sont contrôlés les avis ?",
    answer: "Vous ne pouvez laisser un avis que si l'intervention est marquée comme terminée. Chaque commentaire est ensuite scanné par notre IA pour filtrer les propos inappropriés et garantir la politesse."
  },
  {
    question: "Puis-je modifier mes informations ?",
    answer: "Absolument. Que vous soyez client ou professionnel, vous disposez d'un profil modifiable à tout moment pour mettre à jour vos informations personnelles ou votre mot de passe."
  }
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