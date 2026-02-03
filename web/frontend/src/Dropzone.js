import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@material-ui/core';

function Dropzone({ onDrop, accept }) {
    const handleDrop = useCallback(acceptedFiles => {
        onDrop(acceptedFiles);
    }, [onDrop]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept,
        noClick: true
    });

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2} mt={2} mb={2}>
            <input {...getInputProps()} id="file-uploader" style={{ display: 'none' }} />
            <label htmlFor="file-uploader">
                <Button variant="contained" color="primary" component="span">
                    Select Files
                </Button>
            </label>
            <Box {...getRootProps()} display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2} mt={2} mb={2} bgcolor="background.paper" borderRadius="borderRadius" border={1} borderColor="grey.500" style={{ cursor: 'pointer' }}>
                <Typography variant="h6">
                    {isDragActive ? 'Drop the files here ...' : 'Drag \'n\' drop some files here'}
                </Typography>
            </Box>
        </Box>
    );
}

export default Dropzone;