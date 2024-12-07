import React from 'react';

interface DispatcherProps {
    onDispatch: () => void;
}

const Dispatcher: React.FC<DispatcherProps> = ({ onDispatch }) => {
    const handleDispatch = async () => {
        try {
            const data = await window.electronAPI.fetchData();
            console.log('Dispatched data:', data);
            onDispatch();
        } catch (error) {
            console.error('Dispatch error:', error);
        }
    };

    return (
        <div className="dispatcher">
            <button onClick={handleDispatch}>
                Dispatch Data
            </button>
        </div>
    );
};

export default Dispatcher;
