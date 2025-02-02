import { Puck } from '@measured/puck';
import React from 'react';

export default function PuckRender() {
    return (
        <React.Fragment>
            <Puck.Preview />
            <Puck.Fields />
        </React.Fragment>
    );
}
