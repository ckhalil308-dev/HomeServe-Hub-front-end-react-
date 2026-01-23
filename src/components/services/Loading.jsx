export default function Loading() {
  return (
    <div className="min-h-screen  from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Dots Container */}
        <div className="flex  justify-center gap-3 mb-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
              style={{
                animation: `bounce 1.4s infinite ease-in-out`,
                animationDelay: `${i * 0.16}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-black mb-2 ">Chargement...</h2>
        <p className="text-slate-400 text-sm">Récupération des services</p>

   
       </div>


      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}