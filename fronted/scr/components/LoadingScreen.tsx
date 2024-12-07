import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const messages = [
    'Willkommen',
    'Das ist mit ♥ gemacht',
    'Log dich ein und beginn dein Abenteuer!',
];

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 2500);

        if (index >= messages.length) {
            clearInterval(interval);
            onComplete();
        }

        return () => clearInterval(interval);
    }, [index]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f0f4f8"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={index}
            >
                <Typography variant="h4">{messages[index]}</Typography>
            </motion.div>
        </Box>
    );
};

export default LoadingScreen;
