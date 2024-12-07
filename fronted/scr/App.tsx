import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const steps = [
            'Willkommen',
            'Das ist mit ♥ gemacht',
            'Log dich ein und beginn dein Abenteuer!',
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
            setStep(currentStep);
            currentStep++;
            if (currentStep === steps.length) {
                clearInterval(interval);
                setTimeout(() => setLoading(false), 2500);
            }
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        const texts = ['Willkommen', 'Das ist mit ♥ gemacht', 'Log dich ein und beginn dein Abenteuer!'];
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AnimatePresence>
                    <motion.div
                        key={texts[step]}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.8 }}
                        style={{ fontSize: '2rem', fontWeight: 'bold' }}
                    >
                        {texts[step]}
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Benutzername" />
                <input type="password" placeholder="Passwort" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default App;
