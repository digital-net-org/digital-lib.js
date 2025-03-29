import React from 'react';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import type { SafariNode } from '../types';
import { useClassName } from '../../../core';
import './User.styles.css';

export interface UserProps extends SafariNode {
    inverted?: boolean;
    size?: 'small' | 'medium' | 'large';
    onClick?: (userId: string) => void;
    username?: string;
}

export default function User({ size = 'small', onClick, id, username, inverted }: UserProps) {
    const handleClick = () => onClick?.(id ?? '');
    const className = useClassName({ size, inverted }, 'DigitalUi-User');
    return (
        <div className={className}>
            {onClick ? (
                <Button variant="icon" onClick={handleClick}>
                    <UserContent username={username} size={size} />
                </Button>
            ) : (
                <div className="DigitalUi-User-row">
                    <UserContent username={username} size={size} />
                </div>
            )}
        </div>
    );
}

function UserContent({ username, size }: UserProps) {
    return (
        <React.Fragment>
            <Avatar size={size} />
            {username ? <span>{username}</span> : null}
        </React.Fragment>
    );
}
