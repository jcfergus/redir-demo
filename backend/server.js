const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  if (req.get("Authorization")) {
    res.json({ message: 'Hello from the Backend!', timestamp: new Date() });
  } else {
    res.status(302).header("Location", "/api/authorize").end();
  }
});

app.get('/api/authorize', (req, res) => {
  if (req.get("Meta-Token")) {
    res.status(200).json({ message: "success", authToken: "87654321" });
  } else {
    res.status(302).header("Location", "/api/superauth").end();
  }
})

app.get('/api/superauth', (req, res) => {
  if (req.get("Meta-Token")) {
    res.status(302).header("Location", "/api/authorize").end();
  } else {
    res.status(200).json({ message: "success", metaToken: "12345678", timestamp: new Date() });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
