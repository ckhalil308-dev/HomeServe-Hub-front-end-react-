import React from 'react'
import { useState, useEffect } from 'react'
import { getProfessionalDemandes } from '../../../api/Demande.Api'
import { FileText, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import CountUp from '../../CountUp'

function Dashboard() {
  const [nbrdemandes, setNbrDemandes] = useState(0)
  const [nbrdemandesEncours, setNbrDemandesEncours] = useState(0)
  const [nbrdemandesTermine, setNbrDemandesTermine] = useState(0)
  const [nbrdemandesEnAttente, setNbrDemandesEnAttente] = useState(0)
  const [nbrdemandeRefusee, setNbrDemandeRefusee] = useState(0)
  const [demandesRejete, setDemandesRejete] = useState([])
  const [demandesApprouve, setDemandesApprouve] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfessionalDemandes("");
        console.log("Fetched demandes:", response);
        const demandes = response.demandes;
        setNbrDemandes(demandes.length);
        setNbrDemandesEncours(response.nbrDemandeApprouve);
        setNbrDemandesTermine(response.nbrDemandeTerminees);
        setNbrDemandesEnAttente(response.nbrDemandeEnAttente);
        setNbrDemandeRefusee(response.nbrDemandeRejete);
        setDemandesRejete(response.demandeRejete);
        setDemandesApprouve(response.demandeApprouve);
      } catch (error) {
        console.error("Error fetching demandes:", error);
      }
    }
    fetchData();
  }, [])

  const StatCard = ({ icon: Icon, title, value, bgColor, iconColor }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm flex items-center gap-5 flex-1 min-w-[200px] hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="rounded-lg p-4 flex items-center justify-center" style={{ background: bgColor }}>
        <Icon size={32} color={iconColor} />
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-2 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  )

  const tableCars = [
    {
      titre: "Total Demandes",
      icon: FileText,
      nombre: <CountUp to={nbrdemandes} duration={1} />,
      color: "#3B82F6",
      bgColor: "#EFF6FF"
    },
    {
      titre: "En Cours",
      icon: Clock,
      nombre: <CountUp  from={0} to={nbrdemandesEncours} duration={1} />,
      color: "#F59E0B",
      bgColor: "#FEF3C7"
    },
    {
      titre: "Terminées",
      icon: CheckCircle,
      nombre: <CountUp to={nbrdemandesTermine} duration={1.5} />,
      color: "#10B981",
      bgColor: "#DCFCE7"
    },
    {
      titre: "En Attente",
      icon: AlertCircle,
      nombre: <CountUp to={nbrdemandesEnAttente} duration={1.5} />,
      color: "#EC4899",
      bgColor: "#FCE7F3"
    },
    {
      titre: "Refusées",
      icon: XCircle,
      nombre: <CountUp to={nbrdemandeRefusee} duration={1.5} />,
      color: "#EF4444",
      bgColor: "#FEE2E2"
    }
  ]

  const DemandSection = ({ title, icon: Icon, data, isEmpty, statusColor }) => (
    <div className="animate bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-5 border-b-2 border-gray-200">
        <Icon size={24} color={statusColor} />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {/* <span className="ml-auto px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: statusColor }}>
          {isEmpty ? 0 : data.length}
        </span> */}
      </div>
      
      {isEmpty ? (
        <div className="py-12 text-center text-gray-400">
          <p className="text-sm">Aucune demande</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((demande, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-4 border-2 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-y-0.5"
              style={{ borderColor: `${statusColor}33` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 4px 12px ${statusColor}33`
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Client</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {demande.client.nom} {demande.client.prenom}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Service</p>
                  <p className="text-sm text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">{demande.service.titre}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Prix</p>
                  <p className="text-base font-bold" style={{ color: statusColor }}>
                    {demande.prix ? `${demande.prix} DT` : '-'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Statut</p>
                  <span className="inline-block px-3 py-1 rounded text-xs font-medium text-white" style={{ background: statusColor }}>
                    {title.includes('Rejet') ? 'Rejetée' : 'Approuvée'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Modifié le</p>
                  <p className="text-sm text-gray-500">
                    {demande.updatedAt ? new Date(demande.updatedAt).toLocaleDateString('fr-FR') : '-'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
          <p className="text-gray-500 text-base">Bienvenue sur votre tableau de bord des demandes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          {tableCars.map((car) => (
            <StatCard
              key={car.titre}
              icon={car.icon}
              title={car.titre}
              value={car.nombre}
              bgColor={car.bgColor}
              iconColor={car.color}
            />
          ))}
        </div>

        {/* Demands Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemandSection
            title="Dernières Demandes Rejetées"
            icon={XCircle}
            data={demandesRejete || []}
            isEmpty={!demandesRejete || demandesRejete.length === 0}
            statusColor="#EF4444"
          />
          <DemandSection
            title="Dernières Demandes Approuvées"
            icon={CheckCircle}
            data={demandesApprouve || []}
            isEmpty={!demandesApprouve || demandesApprouve.length === 0}
            statusColor="#10B981"
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard