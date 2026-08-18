import '../styles/globals.scss'

import { FeatureFlagsProvider } from '../context/FeatureFlags'
import { LocaleProvider } from '../context/Locale'

const MyApp = ({ Component, pageProps }) => {
  return (
    <LocaleProvider>
      <FeatureFlagsProvider>
        <Component {...pageProps} />
      </FeatureFlagsProvider>
    </LocaleProvider>
  )
}

export default MyApp
