import { useState, useEffect, createContext } from 'react';

import posthog from 'posthog-js';

export const FeatureFlagsContext = createContext({});

export const FeatureFlagsProvider = ({ children }) => {
	const [posthogFlags, setPosthogFlags] = useState({});

	useEffect(() => {
		posthog.init('phc_1RTcwrmOKtsl66iMXMyx1RjSEx4SzUYYazvBiN49Etm', { 
			api_host: 'https://eu.posthog.com' 
		})
		
		posthog.onFeatureFlags(function(flags) {
			setPosthogFlags(flags);
		})
	}, [posthog])

	const value = {
		flags: posthogFlags
	}

	return (
		<FeatureFlagsContext.Provider value={value}>
			{children}
		</FeatureFlagsContext.Provider>
	);
};

export default FeatureFlagsProvider;
