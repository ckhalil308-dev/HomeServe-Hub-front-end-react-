import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getServiceById } from '../../../api/services.api';
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react';
import ImageCaroselle from './ImageCaroselle';
import ServiceInfo from './ServiceInfo';
import ProSection from './ProSection';
import { FileText, DollarSign, Calendar , Send, ArrowLeft} from 'lucide-react';
import ReserverService from '../client/ReserverService';


const API_URL = import.meta.env.VITE_API_URL;

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const[commander,setCommander]=useState(false); 
  
 

  const fetchServiceDetails = async () => {
    try {
      const Service = await getServiceById(id);
      console.log('Détails du service récupérés:', Service);
      setService(Service);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des détails du service:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchServiceDetails();
  }, [id]);

  const images = service?.imagesUrls || [];



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <p className="text-slate-600">Service non trouvé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <p className="text-sm text-slate-600">
            <Link to="/" className="text-teal-600 cursor-pointer hover:underline">Accueil</Link>
            {' '}/{' '}
            <Link to="/services" className="text-teal-600 cursor-pointer hover:underline">Services</Link>
            {' '}/{' '}
            <span  className="text-slate-700">{service.titre}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Carousel */}
          <ImageCaroselle service={service} API_URL={API_URL} images={images} />

          {/* Service Details */}
          {!commander&&(
             
              <ServiceInfo  setCommander={setCommander} service={service} /> 

          ) }
            {commander&&(
                <>  
   
              <ReserverService  setCommander={setCommander} service={service}/>
     
                
           
                  </>
            )}
           
        </div>

        {/* Professional Card Section */}
        
          <ProSection service={service}></ProSection>
        

        {/* Comments Section */}
        <div className="mt-16 space-y-8">
          <div className="border-b-2 border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900">Avis & Commentaires</h2>
          </div>

          {/* Comments Placeholder */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-12 rounded-xl border-2 border-dashed border-teal-300">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-teal-200 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <p className="text-slate-700 font-semibold text-lg mb-2">Aucun commentaire pour le moment</p>
                <p className="text-slate-600">Soyez le premier à partager votre expérience avec ce service!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;