const User = require("../models/User")

module.exports = {
    async authorize(req){
        console.log("authorize req: "+req.verificationToken)
        let id  = req.userId.replace(/"/g,"");
        console.log(id)
        const user =   await User.findOne({ _id: id },
        function (err, user) {
            if(err){
                return {Error:"invalid user", errorCode:1};
            }
            if(user==null){
                return {Error:"invalid user", errorCode:1};
            }
           return user;

        });
        if(req.verificationToken != user.token){
            return {Error:"invalid token", errorCode:2};
        }
        return {errorCode:0, parsedUserID:id}

    }
}