// src/components/DiseaseClassifier.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Paper } from '@material-ui/core';

const DiseaseClassifier = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [result, setResult] = useState(null);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setSelectedFileUrl(URL.createObjectURL(event.target.files[0]));
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('image', selectedFile); // appending file
        axios
            .post('http://localhost:8000/classify/', formData)
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                console.error('Error uploading the file:', error);
            });
    };
    
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" gutterBottom>Upload Coffee Leaf Image for Disease Classification</Typography>
            <input type="file" onChange={onFileChange} />
            {selectedFileUrl && <img src={selectedFileUrl} alt="Selected" style={{ width: '50%', height: 'auto', marginTop: '20px' }} />}
            <Button variant="contained" color="secondary" onClick={onFileUpload} disabled={!selectedFile} style={{ marginTop: '20px' }}>
                Predict
            </Button>
            {result && (
                <Paper style={{ marginTop: '20px', padding: '20px', width: '50%' }}>
                    <Typography variant="h5">Predicted Disease: {result.predicted_label}</Typography>
                </Paper>
            )}
        </Box>
    );
};

export default DiseaseClassifier;