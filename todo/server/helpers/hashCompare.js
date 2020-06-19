const bcrypt = require("bcrypt");

module.exports = function hashCompare(password,hash) {
  return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, 
        (error, result) => error ? reject(error) : resolve(result)
      );
  }); 
}


