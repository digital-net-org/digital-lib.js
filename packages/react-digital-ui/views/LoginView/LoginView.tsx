import React from 'react';
import { Box } from '../../components';
import { LoginForm } from '../../chunks';
import './LoginView.styles.css';

export default function LoginPage() {
    return (
        <Box className="LoginView" mb={2}>
            <LoginForm />
        </Box>
    );
}
