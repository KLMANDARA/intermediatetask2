const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to execute code
app.post('/execute', (req, res) => {
    const { code, language } = req.body;

    let command = '';
    if (language === 'javascript') {
        command = `node -e "${code}"`;
    } else if (language === 'python') {
        command = `python -c "${code}"`;
    } else if (language === 'ruby') {
        command = `ruby -e "${code}"`;
    } else {
        return res.status(400).send('Language not supported');
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(stderr);
        }
        res.send(stdout);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
