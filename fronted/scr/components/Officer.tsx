import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface OfficerProps {
    onDutyChange?: () => void;
}

const Officer: React.FC<OfficerProps> = ({ onDutyChange }) => {
    const [isOnDuty, setIsOnDuty] = React.useState(false);

    const handleDutyToggle = () => {
        setIsOnDuty(!isOnDuty);
        if (onDutyChange) {
            onDutyChange();
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <Typography variant="h6">
                Diensthabender Beamter
            </Typography>
            <Box mt={2}>
                <Button 
                    variant="contained" 
                    color={isOnDuty ? "error" : "success"}
                    onClick={handleDutyToggle}
                >
                    {isOnDuty ? 'Dienst beenden' : 'Dienst beginnen'}
                </Button>
            </Box>
            <Typography variant="body1" mt={2}>
                Status: {isOnDuty ? 'Im Dienst' : 'Außer Dienst'}
            </Typography>
        </Box>
    );
};

export default Officer;
