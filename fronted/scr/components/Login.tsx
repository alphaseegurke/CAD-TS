import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (username === 'admin' && password === 'admin123') {
            onLogin();
        } else {
            alert('Ungültige Login-Daten!');
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Typography variant="h5">Login</Typography>
            <TextField
                label="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Passwort"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Login
            </Button>
        </Box>
    );
};

export default Login;
