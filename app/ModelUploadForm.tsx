import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, Stack, Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ModelUploadForm = () => {
    const [modelName, setModelName] = useState('');
    const [modelFile, setModelFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleNameChange = (e) => {
        setModelName(e.target.value);
    };

    const handleFileChange = (e) => {
        setModelFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('model', modelFile);
            formData.append('name', modelName);

            await fetch('https://18.116.81.232/upload', {
                method: 'POST',
                body: formData,
            });

            console.log('Model uploaded successfully (FE)');
        } catch (error) {
            console.error('Error uploading model:', error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <Container fixed sx={{ position: 'fixed', zIndex: 1, width: '20rem', right: 0, bottom: 0, margin: 4, borderRadius: 2, textAlign: 'center', display: 'flex', flexDirection: 'row-reverse' }}>
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset" >
                    <Stack p={2} spacing={1}>
                        <label htmlFor="file-upload">
                            <VisuallyHiddenInput id="file-upload" type="file" onChange={handleFileChange} />
                            <Fab component="span" variant="extended" aria-label="upload" className="bg-transparent">
                                <CloudUploadIcon />
                            </Fab>
                        </label>
                        {modelFile && <TextField id="filled-basic" type="text" value={modelName} onChange={handleNameChange} label='Model Name' />}
                        {modelName && <LoadingButton loading={loading} type="submit" variant="outlined" color="primary" startIcon={<CloudUploadIcon />}>
                            Upload Model
                    </LoadingButton>}
                    </Stack>
                </FormControl>
            </form>
        </Container>
    );
};

export default ModelUploadForm;
