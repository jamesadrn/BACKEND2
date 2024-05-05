// users-repository.js
const { User } = require('../../../models');
const { email } = require('../../../models/users-schema');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
    sortFieldName = 'email';
    sortOrder = 'asc';

  // Atur nilai pengurutan jika 'asc' atau 'desc'
  if (value === 'asc') {
    value = 1;
  } else if (value === 'desc') {
    value = -1;
  }

  // Pengurutan Default
  if (sortFieldName && sortOrder) {
    users = users.sort((a, b) => {
      if (a[sortFieldName] < b[sortFieldName]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[sortFieldName] > b[sortFieldName]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  // default query
  query[email] = value;

  // Panggil user.find dengan query default (email:asc)
  let users = await User.find(query);
}

async function getUsersByField(field, value, sortFieldName, sortOrder) {
  let query = {};

  // Atur nilai pengurutan jika 'asc' atau 'desc'
  if (sortOrder === 'asc') {
    sortOrder = 1;
  } else if (sortOrder === 'desc') {
    sortOrder = -1;
  } else {
    // Jika format salah/tidak ada maka defaultnya asc
    sortOrder = 1;
  }

  // Validasi field
  if (field === 'name' || field === 'email') {
    query[field] = value;
  } else return null;

  // Panggil User.find dengan query yang telah dibuat
  let users = await User.find(query);

  // Jika ada kriteria pengurutan, lakukan pengurutan
  if (sortFieldName && sortOrder) {
    users = users.sort((a, b) => {
      if (a[sortFieldName] < b[sortFieldName]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[sortFieldName] > b[sortFieldName]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Sederhanakan pembuatan objek hasil
  const results = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  return results;
}

async function getUser(id) {
  return User.findById(id);
}

async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

async function getUserByEmail(email) {
  return User.findOne({ email });
}

async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUsersByField,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
