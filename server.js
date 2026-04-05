const express = require('express');
const productRoutes = require('./src/routes/productRoutes');

const server = express();

// Middleware to parse incoming JSON bodies
server.use(express.json());

// API Base Route
server.use('/api/products', productRoutes);

// Fallback for missing routes
server.use((req, res) => {
    res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`\n--- CRUD System Active ---`);
    console.log(`CREATE : POST   /api/products`);
    console.log(`READ   : GET    /api/products`);
    console.log(`READ 1 : GET    /api/products/:id`);
    console.log(`UPDATE : PUT    /api/products/:id`);
    console.log(`DELETE : DELETE /api/products/:id`);
});
