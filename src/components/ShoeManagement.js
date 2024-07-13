import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid } from '@mui/material';

const ShoeManagement = () => {
    const [shoes, setShoes] = useState([]);
    const [shoeDetails, setShoeDetails] = useState({
        name: '',
        price: 0,
        size: 0,
        color: '',
        quantity: 0,
        brandId: 0,
        categoryId: 0
    });
    const [updateShoeId, setUpdateShoeId] = useState(null);
    const [updateShoeDetails, setUpdateShoeDetails] = useState({
        name: '',
        price: 0,
        size: 0,
        color: '',
        quantity: 0,
        brandId: 0,
        categoryId: 0
    });

    const API_URL = 'http://localhost:5075/api/Shoe';

    useEffect(() => {
        fetchShoes();
    }, []);

    const fetchShoes = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetShoes`);
            setShoes(response.data);
        } catch (error) {
            console.error('Ошибка получения обуви:', error);
        }
    };

    const addShoe = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddShoe`, null, {
                params: shoeDetails
            });
            alert(response.data);
            fetchShoes();
            setShoeDetails({
                name: '',
                price: 0,
                size: 0,
                color: '',
                quantity: 0,
                brandId: 0,
                categoryId: 0
            });
        } catch (error) {
            console.error('Ошибка добавления обуви:', error);
        }
    };

    const updateShoe = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateShoe`, null, {
                params: { shoeId: updateShoeId, ...updateShoeDetails }
            });
            alert(response.data);
            fetchShoes();
            setUpdateShoeId(null);
            setUpdateShoeDetails({
                name: '',
                price: 0,
                size: 0,
                color: '',
                quantity: 0,
                brandId: 0,
                categoryId: 0
            });
        } catch (error) {
            console.error('Ошибка обновления обуви:', error);
        }
    };

    const deleteShoe = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteShoe`, {
                params: { id }
            });
            alert(response.data);
            fetchShoes();
        } catch (error) {
            console.error('Ошибка удаления обуви:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                <center>Управление обувью</center>
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление обуви</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            value={shoeDetails.name}
                            onChange={(e) => setShoeDetails({ ...shoeDetails, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Цена"
                            type="number"
                            value={shoeDetails.price}
                            onChange={(e) => setShoeDetails({ ...shoeDetails, price: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Размер"
                            type="number"
                            value={shoeDetails.size}
                            onChange={(e) => setShoeDetails({ ...shoeDetails, size: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Цвет"
                            value={shoeDetails.color}
                            onChange={(e) => setShoeDetails({ ...shoeDetails, color: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Количество"
                            type="number"
                            value={shoeDetails.quantity}
                            onChange={(e) => setShoeDetails({ ...shoeDetails, quantity: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID бренда"
                            type="number"
                            value={shoeDetails.brandId}
                            onChange={(e) => setShoeDetails({ ...shoeDetails, brandId: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID категории"
                            type="number"
                            value={shoeDetails.categoryId}
                            onChange={(e) => setShoeDetails({ ...shoeDetails, categoryId: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={addShoe} fullWidth>
                            Добавить обувь
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновить обувь</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ShoeId"
                            type="number"
                            value={updateShoeId}
                            onChange={(e) => setUpdateShoeId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            value={updateShoeDetails.name}
                            onChange={(e) => setUpdateShoeDetails({ ...updateShoeDetails, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Цена"
                            type="number"
                            value={updateShoeDetails.price}
                            onChange={(e) => setUpdateShoeDetails({ ...updateShoeDetails, price: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Размер"
                            type="number"
                            value={updateShoeDetails.size}
                            onChange={(e) => setUpdateShoeDetails({ ...updateShoeDetails, size: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Цвет"
                            value={updateShoeDetails.color}
                            onChange={(e) => setUpdateShoeDetails({ ...updateShoeDetails, color: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Количество"
                            type="number"
                            value={updateShoeDetails.quantity}
                            onChange={(e) => setUpdateShoeDetails({ ...updateShoeDetails, quantity: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID бренда"
                            type="number"
                            value={updateShoeDetails.brandId}
                            onChange={(e) => setUpdateShoeDetails({ ...updateShoeDetails, brandId: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID категории"
                            type="number"
                            value={updateShoeDetails.categoryId}
                            onChange={(e) => setUpdateShoeDetails({ ...updateShoeDetails, categoryId: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" onClick={updateShoe} fullWidth>
                            Обновить обувь
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список обуви</Typography>
                <List>
                    {shoes.map((shoe) => (
                        <ListItem key={shoe.id} button>
                            <ListItemText
                                primary={`ID: ${shoe.id}`}
                                secondary={
                                    <>
                                        <Typography component="span">Имя: {shoe.name}</Typography>
                                        <Typography component="span"> Цена: {shoe.price}</Typography>
                                        <Typography component="span"> Размер: {shoe.size}</Typography>
                                        <Typography component="span"> Цвет: {shoe.color}</Typography>
                                        <Typography component="span"> Количество: {shoe.quantity}</Typography>
                                        <Typography component="span"> Id бренда: {shoe.brandId}</Typography>
                                        <Typography component="span"> Id категории: {shoe.brandId}</Typography>
                                    </>
                                }
                            />
                            <Button variant="outlined" color="error" onClick={() => deleteShoe(shoe.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ShoeManagement;
