  import React from 'react'
  import { useState } from 'react';
  import { Upload, X } from 'lucide-react';
  import { useUser } from '../contexte/context';
  import { createService } from '../../../api/services.api';

  function AddService() {
    const {user,setUser,loading}=useUser(); 
    const [loadingService,setLoadingService]=useState(false);
    const [error,setError]=useState({});
    const [Service, setService] = useState({
      titre: "",
      description: "",
      prix: "",
      images: [],
    });
    const validateForm=()=>{
      const error={};
        if(!Service.titre){
          error.titre="Titre est obligatoire";
        }
        if(!Service.prix){
          error.prix="Prix est obligatoire";
          
        }
        if(Service.prix<=15){
          error.prix="Le prix doit être supérieur à 15 dt";
          
        }
        if(Service.images.length<3){
          error.images="Au moins trois images est requise";

        }

        setError(error);
        return Object.keys(error).length===0;

    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setService(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setService(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    };

    const removeImage = (index) => {
      setService(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if(!validateForm()){
    return;
  }

  setLoadingService(true);

  const formData = new FormData();
  formData.append('titre', Service.titre);
  formData.append('description', Service.description);
  formData.append('prix', Service.prix);
  formData.append('category', user?.specialite );

  Service.images.forEach((file) => {
    formData.append('images', file); 
  });
  formData.forEach((value, key) => {
    console.log(key, value);
  });
  

  try {

    await createService(formData);
    
    alert("Service créé avec succès !");  
    setService({
      titre: "",
      description: "",
      prix: "",
      images: [],
    });
  } catch (error) {
    console.error("Erreur détaillée:", error.response?.data || error.message);
    alert("Erreur lors de la création : " + (error.response?.data?.message || "Erreur serveur"));
  } finally {
    setLoadingService(false);
  }
};

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Creer un Service</h1>
            <p className="text-gray-600">Remplissez les détails ci-dessous pour publier votre service</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Titre de service
              </label>
              <input
                type="text"
                name="titre"
                value={Service.titre}
                onChange={handleInputChange}
                placeholder="Entrez le titre du service"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {error.titre && <p className="text-red-600 text-sm">{error.titre}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={Service.description}
                onChange={handleInputChange}
                placeholder="Décrivez votre service"
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              {error.description && <p className="text-red-600 text-sm">{error.description}</p>}
            </div>
        

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prix
              </label>
              <div className="relative">
                <span className="absolute right-100 top-2.5 text-gray-600 font-medium">dt </span>
                <input
                  type="number"
                  name="prix"
                  value={Service.prix}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {error.prix && <p className="text-red-600 text-sm">{error.prix}</p>}
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Images
              </label>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm font-medium text-gray-700">Clicker pour télécharger ou glisser-déposer (1ere image sera  l'image  principale) </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10Mo</p>
                </label>
              </div>

              {/* Image Preview */}
              {Service.images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {Service.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`preview-${index}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {error.images && <p className="text-red-600 text-sm">{error.images}</p>}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className={"w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors " + (loadingService ? " animation-pulse" : "")}
            >
              Créer un Service
            </button>
          </div>
        </div>
      </div>
    )
  }

  export default AddService