import React, { type PropsWithChildren } from 'react';
import { Puck } from '@measured/puck';
import { defaultPuckData, type DigitalPuckConfig } from './config';

export default function DigitalPuckProvider(props: PropsWithChildren<DigitalPuckConfig>) {
    return (
        <Puck data={defaultPuckData} {...props} />
    );
}
