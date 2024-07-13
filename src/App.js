import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import RoleManagement from './components/RoleManagement';
import BrandManagement from './components/BrandManagement';
import CategoryManagement from './components/CategoryManagement';
import PickupPointManagement from './components/PickupPointManagement';
import ClientManagement from './components/ClientManagement';
import ShoeManagement from './components/ShoeManagement';
import CartManagement from "./components/CartManagement";
import CartItemManagement from "./components/CartItemManagement";
import './App.css';

function App() {
    return (
        <Router>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 0 }}>
                    </Typography>
                    <Button color="inherit" component={Link} to="/roles">Роли</Button>
                    <Button color="inherit" component={Link} to="/brands">Бренды</Button>
                    <Button color="inherit" component={Link} to="/categories">Категории</Button>
                    <Button color="inherit" component={Link} to="/pickup-points">Пункты выдачи</Button>
                    <Button color="inherit" component={Link} to="/clients">Клиенты</Button>
                    <Button color="inherit" component={Link} to="/shoes">Обувь</Button>
                    <Button color="inherit" component={Link} to="/carts">Корзины</Button>
                    <Button color="inherit" component={Link} to="/cartItems">Объекты коризны</Button>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '10px' }}>
                <Routes>
                    <Route path="/roles" element={<RoleManagement />} />
                    <Route path="/brands" element={<BrandManagement />} />
                    <Route path="/categories" element={<CategoryManagement />} />
                    <Route path="/pickup-points" element={<PickupPointManagement />} />
                    <Route path="/clients" element={<ClientManagement />} />
                    <Route path="/shoes" element={<ShoeManagement />} />
                    <Route path="/carts" element={<CartManagement />} />
                    <Route path="/cartItems" element={<CartItemManagement />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
