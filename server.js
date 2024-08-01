const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

app.post('/submit', (req, res) => {
    const { name, freeFireId, email } = req.body;

    if (!name || !freeFireId || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const logEntry = `Name: ${name}, FreeFireID: ${freeFireId}, Email: ${email}\n`;
    fs.appendFile('submissions.txt', logEntry, (err) => {
        if (err) {
            console.error('Failed to write to file:', err);
            return res.status(500).json({ error: 'Failed to save submission' });
        }
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
