import React from 'react';
import useDigitalRouter from '../useDigitalRouter';

export default function RouterDocument() {
    const { current } = useDigitalRouter();

    React.useEffect(() => {
        if (current?.documentName) {
            document.title = current?.documentName;
        }
    }, [current?.documentName]);

    return null;
}
