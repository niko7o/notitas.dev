import { useContext } from 'react';

import { FeatureFlagsContext } from '../context/FeatureFlags';

export const useFeatureFlags = () => {
	const context = useContext(FeatureFlagsContext);
	
	if (context === undefined) {
		throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
	}
	
	return context;
};

export default useFeatureFlags;
