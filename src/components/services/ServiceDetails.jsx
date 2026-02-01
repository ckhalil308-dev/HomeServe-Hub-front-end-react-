import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, use } from 'react';
import { getServiceById } from '../../../api/services.api';
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react';
import ImageCaroselle from './ImageCaroselle';
import ServiceInfo from './ServiceInfo';
import ProSection from './ProSection';
import { FileText, DollarSign, Calendar , Send, ArrowLeft} from 'lucide-react';
import ReserverService from '../client/ReserverService';

import { getCommentsByServiceId } from '../../../api/Comments.api';
import Comments from './Comments';


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

          <ProSection service={service}></ProSection>
        
      <Comments id={id} ></Comments>
      </div>
    </div>
  );
}

export default ServiceDetails;