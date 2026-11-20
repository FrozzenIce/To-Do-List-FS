const express = require("express");
const app = express();
const cors = require("cors")

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const priorityRoutes = require('./routes/priorityRoutes');

app.use(express.json());
app.use(cors());

// API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/priority', priorityRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'App is running'
  });
});

module.exports = app;
