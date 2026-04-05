const express = require('express');

const app = express();
app.use(express.json());


const orders = [];


app.post('/api/orders', (req, res) => {
    const { item, amount } = req.body;
    
    if (!item || !amount) {
        return res.status(400).json({ error: 'Item and amount are required' });
    }

    const newOrder = {
        id: `ORD-${Date.now()}`,
        item,
        amount,
        status: 'CREATED'
    };

    orders.push(newOrder);
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
});


app.get('/api/orders', (req, res) => {
    res.status(200).json({ orders });
});


app.get('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const order = orders.find(o => o.id === id);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('--- Simple API Endpoints ---');
    console.log('1. POST /api/orders      - Create a new order');
    console.log('2. GET  /api/orders      - Get all orders');
    console.log('3. GET  /api/orders/:id  - Get a specific order by ID');
});
