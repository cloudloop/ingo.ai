const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com"
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    const db = admin.firestore();
  // Add a new document in collection "Users"
  db.collection('Users').add({
      name: name,
      email: email
  })
  .then(() => {
    res.send('Data received and saved successfully!');
  })
  .catch((error) => {
    res.send('Error saving data:', error);
  });
});