import { Link } from 'react-router-dom'

import { PromoPanel } from './components/PromoPanel.jsx'
import { SignUpForm } from './components/SignUpForm.jsx'
import { useSignUp } from './hooks/useSignUp.js'

const SignUpPage = () => {
  const { submit, submitting, apiError, apiSuccess } = useSignUp()

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-yellow-300 blur-xl"></div>
          <div className="absolute top-32 right-20 h-16 w-16 rounded-full bg-orange-300 blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-amber-300 blur-xl"></div>
          <div className="absolute right-1/3 bottom-40 h-12 w-12 rounded-full bg-yellow-400 blur-md"></div>
        </div>
      </div>

      <div className="relative flex min-h-screen">
        <PromoPanel />

        <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
          <div className="w-full max-w-md rounded-2xl bg-white/80 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-8 space-y-2 text-center">
              <div className="mb-4 lg:hidden">
                <img alt="ArtHive Logo" className="mx-auto" src="/logo.png" width={200} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Join the Hive!</h2>
              <p className="text-gray-600">Create your account to start buzzing with creativity.</p>
            </div>

            <SignUpForm
              apiError={apiError}
              apiSuccess={apiSuccess}
              submitting={submitting}
              onSubmit={submit}
            />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already part of the hive?{' '}
                <Link
                  className="font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
                  to="/login"
                >
                  Buzz in here!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
