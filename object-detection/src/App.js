import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Typography, Box, Grid, Paper } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import ImageDisplay from './ImageDisplay';
import Dropzone from './Dropzone';

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [originalImage, setOriginalImage] = useState();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onFileChange = files => {
    const file = files[0];
    setSelectedFile(file);
    setOriginalImage(URL.createObjectURL(file));
    setResult(null); // Clear the previous prediction result
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    setLoading(true);
    setError(null);
    axios.post('http://localhost:8000/detect/', formData, { responseType: 'blob' })
      .then(response => {
        console.log('Server response:', response); // Log the server's response
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setResult(url);
        setLoading(false);
      })
      .catch(error => {
        console.error('Upload error:', error); // Log any errors that occur
        setError('Something went wrong. Please try again.');
        setLoading(false);
      });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>Image Processor</Typography>
      <Dropzone onDrop={onFileChange} accept="image/*" />
      <Button variant="contained" color="secondary" onClick={onFileUpload} disabled={loading || !selectedFile} style={{ marginTop: '20px' }}>
        {loading ? <CircularProgress size={24} /> : 'Detect'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <ImageDisplay title="Original" imageSrc={originalImage} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          {result && (
            <Paper>
              <ImageDisplay title="Result" imageSrc={result} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;