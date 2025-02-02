import type { PropsWithChildren } from 'react';

export default function BoxComponent({ children }: PropsWithChildren) {
    return (
        <div style={{ minWidth: 200, minHeight: 200 }}>{children}</div>
    );
}
