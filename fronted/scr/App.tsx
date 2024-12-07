import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    if (!loadingComplete) {
        return <LoadingScreen onComplete={() => setLoadingComplete(true)} />;
    }

    if (!loggedIn) {
        return <Login onLogin={() => setLoggedIn(true)} />;
    }

    return <Dashboard />;
};

export default App;
