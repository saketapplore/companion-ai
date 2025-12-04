import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'

const MinutePricing = () => {
  const [pricingPlans] = useState([
    {
      id: 1,
      name: 'Basic Plan',
      pricePerMinute: 0.50,
      description: 'Standard conversation rate for all users',
      isDefault: true,
      features: [
        'AI companion conversations',
        'Text-based chat',
        'Basic emotional support',
        'Standard response time'
      ]
    },
    {
      id: 2,
      name: 'Premium Plan',
      pricePerMinute: 0.75,
      description: 'Enhanced features with priority support',
      isDefault: false,
      features: [
        'All Basic features',
        'Voice conversations',
        'Advanced AI personality',
        'Priority response time',
        'Conversation history access'
      ]
    },
    {
      id: 3,
      name: 'Enterprise Plan',
      pricePerMinute: 1.00,
      description: 'Full-featured plan with maximum customization',
      isDefault: false,
      features: [
        'All Premium features',
        'Custom AI personality training',
        'Dedicated support',
        'Advanced analytics',
        'API access'
      ]
    }
  ])

  const [pricingStats] = useState({
    averageSessionDuration: 23.5,
    averageSessionCost: 11.75,
    totalMinutesSold: 4250,
    totalRevenue: 2125.00,
    activeSubscribers: 156
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-poppins font-semibold text-gray-800 mb-2">
            Minute Pricing Management
          </h2>
          <p className="text-sm font-montserrat text-gray-600">
            Configure and manage per-minute pricing for AI companion conversations
          </p>
        </div>

        {/* Hardcoded Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-poppins font-semibold text-yellow-900 mb-1">
                Hardcoded Pricing (Initial Implementation)
              </h4>
              <p className="text-xs font-montserrat text-yellow-800">
                Pricing plans are currently hardcoded. This section will be connected to a database for dynamic pricing management in future updates. Contact the development team to modify pricing structures.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Avg Session Duration</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">{pricingStats.averageSessionDuration} min</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Avg Session Cost</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">${pricingStats.averageSessionCost}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Total Minutes Sold</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">{pricingStats.totalMinutesSold.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-poppins font-semibold text-green-600">${pricingStats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-xs font-montserrat text-gray-600 mb-1">Active Subscribers</p>
            <p className="text-2xl font-poppins font-semibold text-gray-800">{pricingStats.activeSubscribers}</p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden transition-all ${
                plan.isDefault 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.isDefault && (
                <div className="bg-blue-500 text-white text-center py-2">
                  <p className="text-xs font-montserrat font-semibold uppercase tracking-wide">
                    Default Plan
                  </p>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm font-montserrat text-gray-600 mb-4">
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-poppins font-bold text-gray-800">
                      ${plan.pricePerMinute}
                    </span>
                    <span className="text-sm font-montserrat text-gray-600">
                      / minute
                    </span>
                  </div>
                  <p className="text-xs font-montserrat text-gray-500 mt-1">
                    ~${(plan.pricePerMinute * 30).toFixed(2)} for 30 min session
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-xs font-montserrat font-semibold text-gray-700 uppercase tracking-wide">
                    Features Included:
                  </p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-montserrat text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  disabled
                  className="w-full py-3 bg-gray-100 text-gray-400 text-sm font-montserrat rounded-lg cursor-not-allowed"
                >
                  Editing Disabled (Hardcoded)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Calculator */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-4">
            Pricing Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="space-y-3">
                <h4 className="text-sm font-poppins font-semibold text-gray-700">
                  {plan.name} - ${plan.pricePerMinute}/min
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-montserrat">
                    <span className="text-gray-600">10 minutes:</span>
                    <span className="font-semibold text-gray-800">${(plan.pricePerMinute * 10).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-montserrat">
                    <span className="text-gray-600">30 minutes:</span>
                    <span className="font-semibold text-gray-800">${(plan.pricePerMinute * 30).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-montserrat">
                    <span className="text-gray-600">60 minutes:</span>
                    <span className="font-semibold text-gray-800">${(plan.pricePerMinute * 60).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-montserrat pt-2 border-t border-gray-200">
                    <span className="text-gray-600">120 minutes:</span>
                    <span className="font-semibold text-blue-600">${(plan.pricePerMinute * 120).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-3">
            Implementation Notes
          </h3>
          <div className="space-y-2 text-sm font-montserrat text-gray-700">
            <p>• Pricing is currently hardcoded in the application</p>
            <p>• Default plan ($0.50/min) applies to all users automatically</p>
            <p>• Future updates will include database integration for dynamic pricing</p>
            <p>• Plan changes will require code deployment until database integration</p>
            <p>• Contact development team for pricing modifications</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MinutePricing



