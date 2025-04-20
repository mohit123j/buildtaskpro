const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('DB connection failed:', err));

app.get('/', (req, res) => {
  res.send('BuildTaskPro API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const Task = require('./models/Task');
const User = require('./models/User');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Models synced with DB');
    console.log('Users synced with DB');
  })
  .catch(err => {
    console.error('Failed syncing models:', err);
  });

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
