const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Example schema and model
const User = mongoose.model('User', {
  name: String,
  email: String
});

app.get('/', (req, res) => {
  res.send('App is working with MongoDB!');
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 App listening on port ${port}`));
