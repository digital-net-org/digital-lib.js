import React from 'react';
import { DigitalClientContext } from './DigitalClientProvider';

export default function useDigitalClient() {
    return React.useContext(DigitalClientContext);
}
