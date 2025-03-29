import React from 'react';
import ClassName from './ClassName';

export default function useClassName(props: Record<string, any>, name: string) {
    return React.useMemo(() => ClassName.resolveProps(name ?? 'Component', props), [name, props]);
}
