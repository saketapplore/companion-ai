const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-poppins font-semibold text-gray-800 mb-2">
            AI Companion
          </h1>
          <p className="text-sm font-montserrat text-gray-500">Admin Panel</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-poppins font-semibold text-gray-800 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm font-montserrat text-gray-500">
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs font-montserrat text-gray-400">
            © 2025 AI Companion. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout



