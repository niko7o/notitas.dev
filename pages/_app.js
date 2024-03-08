import '../styles/globals.scss'

import { FeatureFlagsProvider } from '../context/FeatureFlags'

const MyApp = ({ Component, pageProps }) => {
  return (
    <FeatureFlagsProvider>
      <Component {...pageProps} />
    </FeatureFlagsProvider>
  )
}

export default MyApp
