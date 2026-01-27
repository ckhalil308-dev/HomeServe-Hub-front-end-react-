import React from 'react'
import { Users } from 'lucide-react'

function HeaderTabAdmin({ role, description }) {
  return (
    <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Users size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {role}
            </h1>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>
  )
}

export default HeaderTabAdmin