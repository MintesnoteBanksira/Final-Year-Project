import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import DiseaseClassifier from './DiseaseClassifier';
import HomePage from './HomePage'; // Import HomePage component

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
    setResult(null);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    setLoading(true);
    setError(null);
    axios.post('http://localhost:8000/detect/', formData, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setResult(url);
        setLoading(false);
      })
      .catch(error => {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent
          onFileChange={onFileChange}
          onFileUpload={onFileUpload}
          loading={loading}
          selectedFile={selectedFile}
          originalImage={originalImage}
          result={result}
          error={error}
        />
      </Router>
    </ThemeProvider>
  );
}

function AppContent({ onFileChange, onFileUpload, loading, selectedFile, originalImage, result, error }) {
  const location = useLocation();

  return (
    <>
      {/* Render Navbar only if the path is not '/login' or '/signup' */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/disease-classifier" element={<DiseaseClassifier />} /> {/* Add this line */}
        <Route path="/ripeness-classifier" element={
          <Dashboard
            onFileChange={onFileChange}
            onFileUpload={onFileUpload}
            loading={loading}
            selectedFile={selectedFile}
            originalImage={originalImage}
            result={result}
            error={error}
          />
        } />
        <Route path="/" element={<HomePage />} /> {/* Modify this line */}
      </Routes>
    </>
  );
}

export default App;