import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CartItemManagement = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState('');
    const [shoeId, setShoeId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [updateCartItemId, setUpdateCartItemId] = useState(null);
    const [updateCartId, setUpdateCartId] = useState('');
    const [updateShoeId, setUpdateShoeId] = useState('');
    const [updateQuantity, setUpdateQuantity] = useState('');

    const API_URL = 'http://localhost:5075/api/CartItem';

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetCartItems`);
            setCartItems(response.data);
        } catch (error) {
            console.error('Ошибка получения элементов корзины:', error);
        }
    };

    const addCartItem = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddCartItem`, null, {
                params: { cartId: cartId, shoeId: shoeId, quantity: quantity }
            });
            alert(response.data);
            fetchCartItems();
            setCartId('');
            setShoeId('');
            setQuantity('');
        } catch (error) {
            console.error('Ошибка добавления элемента корзины:', error);
        }
    };

    const updateCartItem = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateCartItem`, null, {
                params: { cartItemId: updateCartItemId, cartId: updateCartId, shoeId: updateShoeId, quantity: updateQuantity }
            });
            alert(response.data);
            fetchCartItems();
            setUpdateCartItemId(null);
            setUpdateCartId('');
            setUpdateShoeId('');
            setUpdateQuantity('');
        } catch (error) {
            console.error('Ошибка обновления элемента корзины:', error);
        }
    };

    const deleteCartItem = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteCartItem`, {
                params: { id }
            });
            alert(response.data);
            fetchCartItems();
        } catch (error) {
            console.error('Ошибка удаления элемента корзины:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                <center>Управление элементами корзины</center>
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление элемента корзины</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID корзины"
                            value={cartId}
                            onChange={(e) => setCartId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID обуви"
                            value={shoeId}
                            onChange={(e) => setShoeId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Количество"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={addCartItem} fullWidth>
                            Добавить элемент
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновить элемент корзины</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID элемента корзины"
                            type="number"
                            value={updateCartItemId}
                            onChange={(e) => setUpdateCartItemId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID корзины"
                            value={updateCartId}
                            onChange={(e) => setUpdateCartId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID обуви"
                            value={updateShoeId}
                            onChange={(e) => setUpdateShoeId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Количество"
                            type="number"
                            value={updateQuantity}
                            onChange={(e) => setUpdateQuantity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={updateCartItem} fullWidth>
                            Обновить элемент
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список элементов корзины</Typography>
                <List>
                    {cartItems.map((cartItem) => (
                        <ListItem key={cartItem.id} button>
                            <ListItemText primary={`ID: ${cartItem.id}  Cart ID: ${cartItem.cartId}  Shoe ID: ${cartItem.shoeId}  Quantity: ${cartItem.quantity}`} />
                            <Button variant="outlined" color="error" onClick={() => deleteCartItem(cartItem.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default CartItemManagement;
