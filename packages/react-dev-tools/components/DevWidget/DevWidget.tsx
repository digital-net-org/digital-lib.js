import React, { type PropsWithChildren } from 'react';

export interface DevWidgetProps extends PropsWithChildren {
    states?: Record<string, any>;
}

export default function DevWidget({ children, states }: DevWidgetProps) {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                zIndex: 9999,
                maxWidth: '400px',
                backgroundColor: 'rgba(86,169,160,0.49)',
                color: 'white',
                cursor: isDragging ? 'grabbing' : 'grab',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '.5rem 1rem',
                gap: '10px',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div>
                {Object.entries(states ?? {}).map(([key, value]) => (
                    <pre key={key}>
                        {key}
                        :
                        {JSON.stringify(value, null, 2)}
                    </pre>
                ))}
            </div>
            <div>            
                {children}
            </div>
        </div>
    );
};
