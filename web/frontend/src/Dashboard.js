import React from 'react';
import { Button, CircularProgress, Typography, Grid, Paper } from '@material-ui/core';
import Dropzone from './Dropzone';
import ImageDisplay from './ImageDisplay';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function Dashboard({ onFileChange, onFileUpload, loading, selectedFile, originalImage, result, error }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>Image Processor</Typography>
      <Dropzone onDrop={onFileChange} accept="image/*" />
      {(!result || !selectedFile) && (
        <Button
          variant="contained"
          color="secondary"
          onClick={onFileUpload}
          disabled={loading || !selectedFile}
          className={classes.button}
        >
          {loading ? <CircularProgress size={24} /> : 'Detect'}
        </Button>
      )}
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
    </div>
  );
}

export default Dashboard;
