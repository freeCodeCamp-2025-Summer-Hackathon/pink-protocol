import { SwatchIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/solid'

export const PromoPanel = () => {
  return (
    <div className="relative hidden flex-col items-center justify-center p-12 lg:flex lg:w-1/2">
      <div className="max-w-md space-y-8 text-center">
        <div className="relative">
          <img alt="ArtHive Logo" className="mx-auto drop-shadow-lg" src="/logo.png" width={500} />
          <div className="absolute -top-4 -right-4 h-8 w-8 animate-pulse rounded-full bg-yellow-400"></div>
          <div className="absolute -bottom-2 -left-6 h-6 w-6 animate-pulse rounded-full bg-orange-400 delay-300"></div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to the <span className="text-yellow-600">Hive</span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            Join our creative community where artists buzz with inspiration and collaboration flows
            like honey.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-8">
          <IconBox
            Icon={SwatchIcon}
            color="bg-yellow-100"
            label="Create Art"
            txt="text-yellow-600"
          />
          <IconBox
            Icon={UserGroupIcon}
            color="bg-orange-100"
            label="Connect"
            txt="text-orange-600"
          />
          <IconBox Icon={SparklesIcon} color="bg-amber-100" label="Inspire" txt="text-amber-600" />
        </div>
      </div>
    </div>
  )
}

const IconBox = ({ Icon, label, color, txt }) => (
  <div className="space-y-2 text-center">
    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
      <Icon className={`h-6 w-6 ${txt}`} />
    </div>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
)
