const bcrypt = require("bcrypt");

module.exports = function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return reject(error);

      bcrypt.hash(
        password, 
        salt, 
        (error, hash) => error ? reject(error) : resolve(hash)
      );
    }); 
  });
}


