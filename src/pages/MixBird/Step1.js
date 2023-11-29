import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Step1() {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState(null);
    const [sex, setSex] = useState(null);
    const [name, setName] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleChangeSex = (event) => {
        setSex(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        localStorage.setItem('category_id', category);
    }, [category]);

    useEffect(() => {
        localStorage.setItem('sex', sex);
    }, [sex]);

    useEffect(() => {
        // Save the file to localStorage as a base64 string
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem('imageFiles', reader.result);
                setUploadSuccess(true); // Set uploadSuccess to true after file is loaded
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    useEffect(() => {
        localStorage.setItem('name', name);
    }, [name]);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Your Bird
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={category}
                            label="Category"
                            onChange={handleChangeCategory}
                        >
                            <MenuItem value={'51d334ad9f0a48a59fa4c7a20f70dcfd'}>Đại bàng</MenuItem>
                            <MenuItem value={'6a2aab32b3574510a434136b31cec3df'}>Vẹt</MenuItem>
                            <MenuItem value={'6bc3f28de70c4982b67d3bd1f0011cf2'}>Chào mào</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sex}
                            label="Sex of birds"
                            onChange={handleChangeSex}
                        >
                            <MenuItem value={true}>Male</MenuItem>
                            <MenuItem value={false}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="outlined-basic"
                        label="Bird Name"
                        variant="outlined"
                        value={name}
                        onChange={handleNameChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <label htmlFor="file-input">
                        <Button
                            component="span"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload image
                        </Button>
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <br />
                    {uploadSuccess && <Typography color={'green'} ><CheckCircleOutlineIcon color="success" fontSize="small" /> Upload Successful!!</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this information for mix details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
