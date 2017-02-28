'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const db = require('APP/db')

const User = db.define('users', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  status: {
    type: Sequelize.ENUM('GUEST', 'REGISTERED'),
    defaultValue: 'GUEST'
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
			isEmail: true,
		}
  },

  // We support oauth, so users may or may not have passwords.
  password_digest: Sequelize.STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
	password: Sequelize.VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
	indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: (user) => {
      if (user.status === 'REGISTERED') {
        return setEmailAndPassword()
      }
    },
    beforeUpdate: (user) => {
      if (user.status === 'REGISTERED') {
        return setEmailAndPassword()
      }
    }
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate (plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      )
    }
  }
})

/**
 * Creates random password for user and ensures password is lowercase
 * This happens automatically on user creation
 */
function setEmailAndPassword(user) {

  if (user.email) {user.email = user.email && user.email.toLowerCase()}
  if (!user.password && user.email) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
	  bcrypt.hash(user.get('password'), 10, (err, hash) => {
		  if (err) reject(err)
		  user.set('password_digest', hash)
      resolve(user)
	  })
  )
}

module.exports = User
