const User = require("../models/User");
const jwt = require('jsonwebtoken')
const hashCompare = require('./hashCompare')

module.exports = {
    async authenticate(req){
        const user = await User.findOne({ email: req.body.email },
        function (err, user) {
              if(err)
                  return "internal error";
              return user;
        });
        switch(user){
            //code 3 is no account
            case null: return data=3;
            //code 4 is server error
            case "internal error": return data=4;
            default: break;
        }
        if(!user.verified){
            return data=5;
        }
        //if true is returned password is correct, 2 if it is inncorrect
        const a = await hashCompare(req.body.pass,user.hash);
        if(a){
            let token =  jwt.sign({ id: user._id }, "SECRET", {expiresIn: 86400 *30// expires in 30 days
            });
            user.token=token;
            await user.save();
            return ({serverCode: a, token:token, auth: true, user:user._id})
        }
        return 2;
    }
}