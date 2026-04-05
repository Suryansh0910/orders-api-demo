// Using an in-memory array to simulate a database table
let products = [];
let currentId = 1;

const productModel = {
    getAll: () => products,
    
    getById: (id) => products.find(p => p.id === parseInt(id)),
    
    create: (data) => {
        const newProduct = {
            id: currentId++,
            name: data.name,
            price: data.price,
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        return newProduct;
    },
    
    update: (id, data) => {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index === -1) return null;
        
        products[index] = { 
            ...products[index], 
            ...data,
            id: products[index].id, // Ensure ID cannot be changed
            updatedAt: new Date().toISOString()
        };
        return products[index];
    },
    
    delete: (id) => {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index === -1) return false;
        
        products.splice(index, 1);
        return true;
    }
};

module.exports = productModel;
