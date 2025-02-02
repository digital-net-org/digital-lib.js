import type { PropsWithChildren } from 'react';

export default function ParagraphComponent({ children }: PropsWithChildren) {
    return (
        <p style={{
            minHeight: '1rem',
            width: '100%',
            padding: '1rem 1rem',
        }}
        >
            {children}
        </p>
    );
}
