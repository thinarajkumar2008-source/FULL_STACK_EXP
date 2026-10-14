const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Student and experiment details
const student = {
    name: 'THINA RAJKUMAR R',
    department: 'B.Tech Information Technology',
    college: 'Kongu Engineering College'
};

// MongoDB connection
const mongoUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'storeDB';

let products;

async function startServer() {
    try {
        const client = new MongoClient(mongoUrl);

        await client.connect();

        const db = client.db(dbName);
        products = db.collection('products');

        console.log('Connected to MongoDB successfully');
        console.log('Student:', student.name);
        console.log('Department:', student.department);
        console.log('College:', student.college);

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start application:', error.message);
        process.exit(1);
    }
}

// ======================================
// FRONTEND WEBPAGE
// ======================================

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Product Management | Experiment 5</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 25px;
            font-family: Arial, sans-serif;
            background: #f1f5f9;
            color: #1e293b;
        }

        .container {
            max-width: 1000px;
            margin: auto;
        }

        .header {
            background: #1d4ed8;
            color: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 20px;
        }

        .header h1 {
            margin-top: 0;
        }

        .student {
            background: white;
            padding: 16px;
            border-radius: 10px;
            margin-bottom: 20px;
            line-height: 1.8;
            border-left: 5px solid #2563eb;
        }

        .card {
            background: white;
            padding: 22px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 3px 12px #0000000d;
        }

        input {
            width: 100%;
            padding: 12px;
            margin: 8px 0 14px;
            border: 1px solid #cbd5e1;
            border-radius: 7px;
        }

        button {
            padding: 10px 15px;
            border: none;
            border-radius: 7px;
            cursor: pointer;
            color: white;
            background: #2563eb;
            margin: 3px;
        }

        button:hover {
            opacity: 0.85;
        }

        .delete {
            background: #dc2626;
        }

        .edit {
            background: #059669;
        }

        .refresh {
            background: #475569;
        }

        .table-wrap {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            text-align: left;
        }

        th {
            background: #eff6ff;
        }

        #message {
            margin-top: 12px;
            font-weight: bold;
        }

        .footer {
            text-align: center;
            color: #64748b;
            padding: 15px;
        }
    </style>
</head>

<body>
<div class="container">

    <header class="header">
        <h1>Product Management System</h1>
        <p>Experiment 5 — CRUD Operations Using MongoDB</p>
    </header>

    <section class="student">
        <strong>Student:</strong> THINA RAJKUMAR R<br>
        <strong>Department:</strong> B.Tech Information Technology<br>
        <strong>College:</strong> Kongu Engineering College
    </section>

    <section class="card">
        <h2 id="formTitle">Add New Product</h2>

        <form id="productForm">
            <label for="name">Product Name</label>
            <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter product name"
                required
            >

            <label for="price">Product Price (₹)</label>
            <input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter product price"
                required
            >

            <button type="submit" id="submitButton">
                Add Product
            </button>

            <button
                type="button"
                class="refresh"
                onclick="resetForm()"
            >
                Clear
            </button>
        </form>

        <p id="message" role="status"></p>
    </section>

    <section class="card">
        <h2>Product List</h2>

        <button class="refresh" onclick="fetchProducts()">
            Load / Refresh Products
        </button>

        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody id="tableBody">
                    <tr>
                        <td colspan="4">Loading products...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <footer class="footer">
        Experiment 5 | Node.js, Express.js and MongoDB
    </footer>

</div>

<script>
    let editingId = null;

    const form = document.getElementById('productForm');
    const message = document.getElementById('message');
    const tableBody = document.getElementById('tableBody');

    function showMessage(text, isError = false) {
        message.textContent = text;
        message.style.color = isError ? '#dc2626' : '#15803d';
    }

    function resetForm() {
        editingId = null;
        form.reset();

        document.getElementById('formTitle').textContent =
            'Add New Product';

        document.getElementById('submitButton').textContent =
            'Add Product';

        showMessage('');
    }

    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Unable to load products');
            }

            tableBody.replaceChildren();

            if (data.length === 0) {
                const row = tableBody.insertRow();
                const cell = row.insertCell();

                cell.colSpan = 4;
                cell.textContent = 'No products found. Add a product above.';
                return;
            }

            data.forEach(product => {
                const row = tableBody.insertRow();

                const idCell = row.insertCell();
                const nameCell = row.insertCell();
                const priceCell = row.insertCell();
                const actionsCell = row.insertCell();

                idCell.textContent = product._id;
                nameCell.textContent = product.name;
                priceCell.textContent =
                    '₹' + Number(product.price).toFixed(2);

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.className = 'edit';
                editButton.addEventListener('click', () => {
                    editProduct(product);
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete';
                deleteButton.addEventListener('click', () => {
                    deleteProduct(product._id);
                });

                actionsCell.append(editButton, deleteButton);
            });
        } catch (error) {
            showMessage(error.message, true);
        }
    }

    // CREATE: Add a product
    form.addEventListener('submit', async event => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const price = Number(document.getElementById('price').value);

        if (!name || !Number.isFinite(price) || price <= 0) {
            showMessage(
                'Enter a product name and a price greater than zero.',
                true
            );
            return;
        }

        const isEditing = editingId !== null;

        try {
            const url = isEditing
                ? '/api/products/' + editingId
                : '/api/products';

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, price })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            showMessage(data.message);
            resetForm();
            await fetchProducts();
        } catch (error) {
            showMessage(error.message, true);
        }
    });

    // UPDATE: Load a product into the form for editing
    function editProduct(product) {
        editingId = product._id;

        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;

        document.getElementById('formTitle').textContent =
            'Update Product';

        document.getElementById('submitButton').textContent =
            'Save Changes';

        showMessage('Edit the product details and click Save Changes.');
        document.getElementById('name').focus();
    }

    // DELETE: Remove a product
    async function deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const response = await fetch('/api/products/' + id, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Unable to delete product');
            }

            showMessage(data.message);
            await fetchProducts();
        } catch (error) {
            showMessage(error.message, true);
        }
    }

    fetchProducts();
</script>

</body>
</html>
    `);
});

// ======================================
// READ: GET ALL PRODUCTS
// ======================================

app.get('/api/products', async (req, res) => {
    try {
        const list = await products.find().toArray();
        res.json(list);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to retrieve products'
        });
    }
});

// ======================================
// CREATE: ADD A PRODUCT
// ======================================

app.post('/api/products', async (req, res) => {
    try {
        const name =
            typeof req.body.name === 'string'
                ? req.body.name.trim()
                : '';

        const price = Number(req.body.price);

        if (
            !name ||
            req.body.price === undefined ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            return res.status(400).json({
                error: 'Enter a product name and a price greater than zero.'
            });
        }

        const newProduct = { name, price };

        const result = await products.insertOne(newProduct);

        res.status(201).json({
            message: 'Product created successfully',
            product: {
                _id: result.insertedId,
                ...newProduct
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create product'
        });
    }
});

// ======================================
// UPDATE: MODIFY PRODUCT INFORMATION
// ======================================

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: 'Invalid product ID'
            });
        }

        const name =
            typeof req.body.name === 'string'
                ? req.body.name.trim()
                : '';

        const price = Number(req.body.price);

        if (
            !name ||
            req.body.price === undefined ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            return res.status(400).json({
                error: 'Enter a product name and a price greater than zero.'
            });
        }

        const result = await products.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, price } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        res.json({
            message: 'Product updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to update product'
        });
    }
});

// ======================================
// DELETE: REMOVE A PRODUCT
// ======================================

app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: 'Invalid product ID'
            });
        }

        const result = await products.deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        res.json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to delete product'
        });
    }
});

// Start the application
startServer();
