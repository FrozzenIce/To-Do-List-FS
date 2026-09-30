const express = require("express");
const app = express();

const authRoutes = require('./routes/authRotues');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.json());

app.use("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

// API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/category', categoryRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'App is running'
  });
})

module.exports = app;
