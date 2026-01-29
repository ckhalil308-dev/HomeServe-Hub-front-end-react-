import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ServiceCard(props) {
  const Icon = props.icon
  const navigate = useNavigate()

  return (
    <div className="group w-[280px] min-h-[380px] bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100 hover:scale-[1.03] transition-all duration-300 ease-out flex flex-col">
      
      {/* Icon Header */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="h-16 w-16 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:bg-teal-500 transition-colors duration-300">
          <Icon className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
          {props.title}
        </h3>
      </div>

      {/* Features List */}
      <div className="flex-grow space-y-4">
        {props.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100/80">
              <Check className="h-3 w-3 text-teal-700" strokeWidth={4} />
            </div>
            <span className="text-sm font-medium text-gray-600 leading-tight">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Button - Clean & Sharp */}
      <button 
        onClick={() => navigate(`${props.link}`)} 
        className="mt-8 w-full rounded-2xl bg-gray-950 py-4 text-sm font-black text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest"
      >
        Voir Plus
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>
  )
}