import React from 'react';
import type { SafariNodeWithChildren } from '../types';
import './Header.styles.css';

export type HeaderProps = SafariNodeWithChildren;

export default function Header(props: HeaderProps) {
    return <header className="SafariUi-Header" {...props} />;
}
