import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'

const Integrations = () => {
  const [activeTab, setActiveTab] = useState('payment')

  const integrations = {
    payment: {
      title: 'Payment Gateway Integration',
      description: 'The system will integrate with a secure payment gateway for processing user payments.',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      status: 'active',
      provider: 'Stripe',
      features: [
        'Secure payment processing',
        'Multiple payment methods',
        'Automated recurring billing',
        'PCI DSS compliant',
        'Real-time transaction monitoring',
        'Refund management'
      ],
      configuration: {
        apiKey: '••••••••••••••••••••sk_live_1234',
        webhookUrl: 'https://api.aicompanion.com/webhooks/stripe',
        currency: 'USD',
        testMode: false
      }
    },
    ai: {
      title: 'AI Tool Integration',
      description: 'The application will integrate with AI tool to enable AI Companion conversation. The implementation includes base training for the model, the datasets will be provided by the client.',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      status: 'active',
      provider: 'OpenAI GPT-4',
      features: [
        'Natural language processing',
        'Contextual conversation memory',
        'Emotion detection and response',
        'Base training with client datasets',
        'Personality customization',
        'Multi-language support'
      ],
      configuration: {
        apiKey: '••••••••••••••••••••sk_proj_5678',
        model: 'gpt-4-turbo',
        maxTokens: 2048,
        temperature: 0.7,
        trainingStatus: 'Completed'
      },
      trainingInfo: {
        datasetsProvided: true,
        lastTrainingDate: '2024-11-15',
        modelVersion: 'v2.1',
        accuracy: '94.5%'
      }
    },
    otp: {
      title: 'OTP Service Provider',
      description: 'The system will integrate with an OTP service provider for mobile number verification.',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      status: 'active',
      provider: 'Twilio Verify',
      features: [
        'SMS-based OTP delivery',
        'Multi-channel verification (SMS, Voice)',
        'Global phone number support',
        'Rate limiting protection',
        'Delivery tracking',
        'Fraud detection'
      ],
      configuration: {
        accountSid: '••••••••••••••••••••AC1234',
        authToken: '••••••••••••••••••••',
        serviceSid: 'VA••••••••••••••••••••',
        otpLength: 6,
        validity: '5 minutes'
      }
    }
  }

  const currentIntegration = integrations[activeTab]

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-poppins font-semibold text-gray-800 mb-2">
            Third-Party Integrations
          </h2>
          <p className="text-sm font-montserrat text-gray-600">
            Manage external service integrations for payments, AI, and verification
          </p>
        </div>

        {/* Integration Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('payment')}
              className={`flex-1 px-6 py-4 text-sm font-montserrat font-medium transition-colors ${
                activeTab === 'payment'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Gateway
              </div>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 px-6 py-4 text-sm font-montserrat font-medium transition-colors ${
                activeTab === 'ai'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI Tool
              </div>
            </button>
            <button
              onClick={() => setActiveTab('otp')}
              className={`flex-1 px-6 py-4 text-sm font-montserrat font-medium transition-colors ${
                activeTab === 'otp'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                OTP Service
              </div>
            </button>
          </div>

          <div className="p-8">
            {/* Integration Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={currentIntegration.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-2">
                    {currentIntegration.title}
                  </h3>
                  <p className="text-sm font-montserrat text-gray-600 max-w-2xl leading-relaxed">
                    {currentIntegration.description}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-montserrat font-medium border ${getStatusBadge(currentIntegration.status)}`}>
                <span className="w-2 h-2 bg-current rounded-full mr-2"></span>
                {currentIntegration.status.charAt(0).toUpperCase() + currentIntegration.status.slice(1)}
              </span>
            </div>

            {/* Provider Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <p className="text-sm font-montserrat text-blue-900">
                <strong>Current Provider:</strong> {currentIntegration.provider}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                Features & Capabilities
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentIntegration.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-montserrat text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div className="mb-8">
              <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                Configuration Settings
              </h4>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                {Object.entries(currentIntegration.configuration).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="text-sm font-montserrat font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-sm font-montserrat text-gray-900 font-mono bg-white px-3 py-1 rounded border border-gray-200">
                      {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Training Info (only for AI tab) */}
            {activeTab === 'ai' && currentIntegration.trainingInfo && (
              <div className="mb-8">
                <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
                  Training Information
                </h4>
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-montserrat text-purple-600 mb-1">Client Datasets</p>
                      <p className="text-lg font-poppins font-semibold text-purple-900">
                        {currentIntegration.trainingInfo.datasetsProvided ? 'Provided ✓' : 'Pending'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-montserrat text-purple-600 mb-1">Last Training</p>
                      <p className="text-lg font-poppins font-semibold text-purple-900">
                        {new Date(currentIntegration.trainingInfo.lastTrainingDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-montserrat text-purple-600 mb-1">Model Version</p>
                      <p className="text-lg font-poppins font-semibold text-purple-900">
                        {currentIntegration.trainingInfo.modelVersion}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-montserrat text-purple-600 mb-1">Model Accuracy</p>
                      <p className="text-lg font-poppins font-semibold text-purple-900">
                        {currentIntegration.trainingInfo.accuracy}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="text-xs font-montserrat text-purple-700">
                      <strong>Note:</strong> Base training has been completed with client-provided datasets. The model is continuously learning from conversations to improve accuracy.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                disabled
                className="px-6 py-3 bg-gray-100 text-gray-400 text-sm font-montserrat rounded-lg cursor-not-allowed"
              >
                Test Connection
              </button>
              <button
                disabled
                className="px-6 py-3 bg-gray-100 text-gray-400 text-sm font-montserrat rounded-lg cursor-not-allowed"
              >
                Update Configuration
              </button>
              <button
                disabled
                className="px-6 py-3 bg-gray-100 text-gray-400 text-sm font-montserrat rounded-lg cursor-not-allowed"
              >
                View Documentation
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h5 className="text-sm font-poppins font-semibold text-yellow-900 mb-1">
                    Security Notice
                  </h5>
                  <p className="text-xs font-montserrat text-yellow-800">
                    API keys and sensitive credentials are encrypted and stored securely. Only authorized administrators can modify integration settings. Configuration changes require development team approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-montserrat font-semibold text-gray-700">Payment Gateway</h4>
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-montserrat">
                Active
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-montserrat">
                <span className="text-gray-600">Total Transactions</span>
                <span className="font-semibold text-gray-800">137</span>
              </div>
              <div className="flex justify-between text-sm font-montserrat">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-semibold text-green-600">98.5%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-montserrat font-semibold text-gray-700">AI Tool</h4>
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-montserrat">
                Active
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-montserrat">
                <span className="text-gray-600">API Calls Today</span>
                <span className="font-semibold text-gray-800">1,247</span>
              </div>
              <div className="flex justify-between text-sm font-montserrat">
                <span className="text-gray-600">Avg Response Time</span>
                <span className="font-semibold text-blue-600">1.2s</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-montserrat font-semibold text-gray-700">OTP Service</h4>
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-montserrat">
                Active
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-montserrat">
                <span className="text-gray-600">OTPs Sent Today</span>
                <span className="font-semibold text-gray-800">45</span>
              </div>
              <div className="flex justify-between text-sm font-montserrat">
                <span className="text-gray-600">Delivery Rate</span>
                <span className="font-semibold text-green-600">99.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Integrations



