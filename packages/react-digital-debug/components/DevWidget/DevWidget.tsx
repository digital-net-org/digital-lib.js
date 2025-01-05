import React, { type PropsWithChildren } from 'react';
import type { Position } from '../../../core';
import './DevWidget.styles.css';
import { Text } from '../../../react-digital-ui';

export interface DevWidgetProps extends PropsWithChildren {
    appVersion?: string;
    position: Position;
    onMove: (position: Position) => void;
    offset: Position;
    onDrag: (offset: Position) => void;
}

export default function DevWidget({ children, appVersion, position, offset, onDrag, onMove }: DevWidgetProps) {
    const [isDragging, setIsDragging] = React.useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        onDrag({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;
        onMove({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="DevWidget"
            style={{ top: position.y, left: position.x }}
        >
            <div
                className={`DevWidget-title ${isDragging ? 'DevWidget-grabbing' : 'DevWidget-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <Text variant="caption">devtool</Text>
                {appVersion && <Text>{appVersion}</Text>}
            </div>
            <div className="DevWidget-content">
                {children}
            </div>
        </div>
    );
};
