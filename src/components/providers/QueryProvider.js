'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({ children }) {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						refetchInterval: 60 * 1000,
					},
				},
			}),
		[]
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
