import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid } from '@mui/material';

const BrandManagement = () => {
    const [brands, setBrands] = useState([]);
    const [brandName, setBrandName] = useState('');
    const [updateBrandId, setUpdateBrandId] = useState(null);
    const [updateBrandName, setUpdateBrandName] = useState('');

    const API_URL = 'http://localhost:5075/api/Brand';

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetBrands`);
            setBrands(response.data);
        } catch (error) {
            console.error('Ошибка получения брендов:', error);
        }
    };

    const addBrand = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddBrand`, null, {
                params: { name: brandName }
            });
            alert(response.data);
            fetchBrands();
            setBrandName('');
        } catch (error) {
            console.error('Ошибкак добавления бренда:', error);
        }
    };

    const updateBrand = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateBrand`, null, {
                params: { brandId: updateBrandId, name: updateBrandName }
            });
            alert(response.data);
            fetchBrands();
            setUpdateBrandId(null);
            setUpdateBrandName('');
        } catch (error) {
            console.error('Ошибка обновления бренда:', error);
        }
    };

    const deleteBrand = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteBrand`, {
                params: { id }
            });
            alert(response.data);
            fetchBrands();
        } catch (error) {
            console.error('Ошибка удаления бренда:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Управление брендами
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление брендов</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя роли"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={addBrand} fullWidth>
                            Добавление бренда
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновить бренд</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="BrandId"
                            type="number"
                            value={updateBrandId}
                            onChange={(e) => setUpdateBrandId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя роли"
                            value={updateBrandName}
                            onChange={(e) => setUpdateBrandName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" onClick={updateBrand} fullWidth>
                            Обновить бренд
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список брендов</Typography>
                <List>
                    {brands.map((brand) => (
                        <ListItem key={brand.id} button>
                            <ListItemText primary={`ID: ${brand.id}  name: ${brand.name}`} />
                            {/*<ListItemText primary={role.name} />*/}
                            <Button variant="outlined" color="error" onClick={() => deleteBrand(brand.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default BrandManagement;