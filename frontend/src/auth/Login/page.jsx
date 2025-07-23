import { Link } from 'react-router-dom'

import { PromoPanel } from '../../components/PromoPanel/PromoPanel.jsx'

import { LoginForm } from './components/LoginForm'
import { useLogin } from './hooks/useLogin'

const LoginPage = () => {
  const { submit, submitting, apiError } = useLogin()

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50"></div>
      </div>

      <div className="relative flex min-h-screen">
        <PromoPanel />

        <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
          <div className="w-full max-w-md rounded-2xl bg-white/80 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-8 space-y-2 text-center">
              <div className="mb-4 lg:hidden">
                <img alt="ArtHive Logo" className="mx-auto" src="/logo.png" width={200} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="text-gray-600">Sign in to continue your creative journey.</p>
            </div>

            <LoginForm apiError={apiError} submitting={submitting} onSubmit={submit} />

            <div className="mt-6 text-center text-sm text-gray-600">
              New to the hive?{' '}
              <Link
                className="font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
                to="/signup"
              >
                Join the buzz!
              </Link>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-center text-xs leading-relaxed text-gray-500">
                By signing in, you agree to our{' '}
                <Link className="text-yellow-600 hover:underline" to="/terms">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link className="text-yellow-600 hover:underline" to="/privacy">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
