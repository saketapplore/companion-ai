import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateEmail = () => {
    const newErrors = {}
    
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors({})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmail()) {
      return
    }
    
    setIsLoading(true)
    setErrors({})
    
    try {
      // API call would go here
      // const response = await requestPasswordReset(email)
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
    } catch (error) {
      setErrors({
        submit: error.message || 'Failed to send reset email. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="Password reset instructions sent"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-2">
              Email Sent Successfully!
            </h3>
            <p className="text-sm font-montserrat text-gray-600 mb-1">
              We've sent password reset instructions to:
            </p>
            <p className="text-sm font-montserrat font-semibold text-blue-600">
              {email}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-left">
            <p className="text-xs font-montserrat text-blue-900 mb-2">
              <strong>Next Steps:</strong>
            </p>
            <ol className="text-xs font-montserrat text-blue-800 space-y-1 list-decimal list-inside">
              <li>Check your email inbox for the reset link</li>
              <li>Click the link to create a new password</li>
              <li>The link will expire in 1 hour for security</li>
            </ol>
          </div>

          <div className="text-xs font-montserrat text-gray-500">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setIsSuccess(false)}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              try again
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/admin/login"
            className="btn-secondary w-full text-center"
          >
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email to receive password reset instructions"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="input-field"
            placeholder="admin@example.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="error-message">{errors.email}</p>
          )}
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm font-montserrat text-red-600">{errors.submit}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Reset Instructions'
          )}
        </button>

        <div className="text-center">
          <Link
            to="/admin/login"
            className="text-sm font-montserrat text-gray-600 hover:text-gray-800 transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Login
          </Link>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-poppins font-semibold text-gray-900 mb-1">
              Password Reset Process
            </h4>
            <p className="text-xs font-montserrat text-gray-600">
              For security, you'll receive an email with a secure link to reset your password. The link expires after 1 hour.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword



