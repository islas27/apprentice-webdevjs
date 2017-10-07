const express = require('express');

const router = express.Router();
// Database simulator - runs in memory, every reload kills it
const db = (function db() {
  const users = {};
  let id = 0;
  return {
    getUsers: () => users,
    getUserById: uid => users[uid] || {},
    createUser: (user) => {
      id += 1;
      users[id] = user;
    },
    updateUser: (uid, user) => {
      users[uid] = Object.assign(users[uid], user);
    },
    deleteUser: (uid) => {
      users[uid] = {};
    },
  };
}());

router.get('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome to the quick API' });
});

// Save a user in the 'db'
router.post('/users', (req, res) => {
  const user = req.body;
  console.log(user);
  db.createUser(user);
  res.status(201).send({ msg: 'ok' });
});

// Add another routes for the API, I suggest the following:
// How to update a user, how to delete it, how to get all users... Have fun :)

module.exports = router;
