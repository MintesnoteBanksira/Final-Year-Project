// src/components/HomePage.js
import React from 'react';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Button variant="contained" color="primary" component={Link} to="/disease-classifier" style={{ marginBottom: '20px' }}>
                Disease Classification
            </Button>
            <Button variant="contained" color="primary" component={Link} to="/ripeness-classifier">
                Ripeness Classification
            </Button>
        </Box>
    );
};

export default HomePage;