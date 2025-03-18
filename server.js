const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path')
dotenv.config();

const app = express();

// Log MongoDB URL for debugging purposes
console.log('MONGO_URL:', process.env.MONGODB_URL);

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON payloads
app.use(bodyParser.urlencoded({ extended: false })); // To parse URL-encoded payloads

// Database Connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('DB Connected.'))
    .catch((e) => console.error('DB Connection Error:', e));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/home', require('./routes/contentRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
// app.use('/api/team', require('./routes/teamMembers'));
app.use('/api/team-members', require('./routes/teamMembers'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
