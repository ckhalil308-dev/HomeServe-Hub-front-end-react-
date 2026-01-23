import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ServiceCard(props) {
  const Icon = props.icon
  const navigate = useNavigate()

  return (
    <div className=" w-[240px] h-[320px] bg-teal-100 p-5 hover:scale-[1.02] transition duration-300 ease-in-out ">
      {/* Icon */}
      <div className="flex justify-center">
        <Icon className="h-12 w-12 text-teal-700" />
      </div>

      {/* Title */}
      <h3 className="mt-3 text-center text-lg font-semibold text-teal-900">{props.title}</h3>

      {/* Features box */}
      <div className="mt-5  bg-white p-4 shadow-sm">
        <div className="space-y-3">
          {props.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center  bg-teal-500">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* See more button */}
      <button onClick={() => navigate(`${props.link}`)} className="mt-5 w-full rounded-xl border border-teal-300 bg-white px-4 py-2.5 text-sm font-bold text-teal-800 transition-colors hover:bg-teal-50">
        voirs plus →
      </button>
    </div>
  )
}
