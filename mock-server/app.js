import express from 'express';
const app = express();
const PORT = 5500;

// Middleware to parse JSON bodies
app.use(express.json());

// Database
const RECORDS = new Map();

RECORDS.set('1234', {
    id: '1234',
    name: 'David Nguyen',
    age: 33,
    career: 'Worker',
    job: 'Software Engineer',
});

const generateId = () => {
    return Math.random().toString(36).slice(2, 7);
}

// Define your routes
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the mock-server');
});

app.get('/api/users', (req, res) => {
    const records = Array.from(RECORDS.values());

    res.json(records);
});

app.post('/api/users', (req, res) => {
    // Access the data sent in the POST request body
    const postData = req.body;
    postData.id = generateId();

    // Save to DB
    RECORDS.set(postData.id, postData);

    res.send(200);
});

app.put('/api/users/:id', (req, res) => {
    const recordId = req.params.id;
    const record = RECORDS.get(recordId);

    // Handle invalid requests
    if (!record) {
        res.status(400).send(`Invalid request. ${recordId} does not exist`);
        return;
    }

    // Save to DB
    RECORDS.set(recordId, req.body);

    res.send(200);
});

app.delete('/api/users/:id', (req, res) => {
    const recordId = req.params.id;
    const record = RECORDS.get(recordId);

    // Handle invalid requests
    if (!record) {
        res.status(400).send(`Invalid request. ${recordId} does not exist`);
        return;
    }

    // Delete the given record from DB
    RECORDS.delete(recordId);

    res.send(200);
});

// Handle 404 - Route not found
app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
