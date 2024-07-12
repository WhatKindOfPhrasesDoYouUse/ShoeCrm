import React from 'react';
import RoleManagement from './components/RoleManagement';
import BrandManagement from './components/BrandManagement';
import CategoryManagement from './components/CategoryManagement';
import './App.css';

function App() {
    return (
        <div className="App">
            <RoleManagement />
            <BrandManagement />
            <CategoryManagement />
        </div>
    );
}

export default App;
