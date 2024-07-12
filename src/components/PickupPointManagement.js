import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid } from '@mui/material';

const PickupPointManagement = () => {
    const [pickupPoints, setPickupPoints] = useState([]);
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [updateCity, setUpdateCity] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');
    const API_URL = 'http://localhost:5075/api/PickupPoint';

    useEffect(() => {
        fetchPickupPoints();
    }, []);

    const fetchPickupPoints = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetPickupPoints`);
            setPickupPoints(response.data);
        } catch (error) {
            console.error('Ошибка получения пунктов выдачи:', error);
        }
    };

    const addPickupPoint = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddPickupPoint`, null, {
                params: { city, address }
            });
            alert(response.data);
            fetchPickupPoints();
            setCity('');
            setAddress('');
        } catch (error) {
            console.error('Ошибка добавления пункта выдачи:', error);
        }
    };

    const updatePickupPoint = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateDeletePickupPoint`, null, {
                params: { pickupId: updateId, city: updateCity, address: updateAddress }
            });
            alert(response.data);
            fetchPickupPoints();
            setUpdateId('');
            setUpdateCity('');
            setUpdateAddress('');
        } catch (error) {
            console.error('Ошибка обновления пункта выдачи:', error);
        }
    };

    const deletePickupPoint = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeletePickupPoint`, {
                params: { id }
            });
            alert(response.data);
            fetchPickupPoints();
        } catch (error) {
            console.error('Ошибка удаления пункта выдачи:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Управление пунктами выдачи
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление пункта выдачи</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Город"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Адрес"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="primary" onClick={addPickupPoint} fullWidth>
                            Добавить пункт
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновление пункта выдачи</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID"
                            value={updateId}
                            onChange={(e) => setUpdateId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Город"
                            value={updateCity}
                            onChange={(e) => setUpdateCity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Адрес"
                            value={updateAddress}
                            onChange={(e) => setUpdateAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={updatePickupPoint} fullWidth>
                            Обновить пункт
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список пунктов выдачи</Typography>
                <List>
                    {pickupPoints.map((pickup) => (
                        <ListItem key={pickup.id} button>
                            <ListItemText primary={`ID: ${pickup.id}, Город: ${pickup.city}, Адрес: ${pickup.address}`} />
                            <Button variant="outlined" color="error" onClick={() => deletePickupPoint(pickup.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default PickupPointManagement;
