import React, { type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { DigitalClient } from './DigitalClient';

export default function DigitalClientProvider(props: PropsWithChildren) {
    return <QueryClientProvider client={DigitalClient.queryClient} {...props} />;
}
