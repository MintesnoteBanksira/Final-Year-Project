import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { saveAs } from 'file-saver';

function ImageDisplay({ title, imageSrc }) {
    const handleDownload = () => {
        saveAs(imageSrc, `${title}.jpg`);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6">{title}</Typography>
            {imageSrc && <img src={imageSrc} alt={title} style={{ width: '320px', height: 'auto' }} />}
            {title === 'Result' && imageSrc && (
                <Button variant="contained" color="primary" onClick={handleDownload} style={{ marginTop: '10px' }}>
                    Download
                </Button>
            )}
        </Box>
    );
}

export default ImageDisplay;