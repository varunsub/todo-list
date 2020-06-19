
const User = require("../models/User");

module.exports = {
    async verify(uuid){
        try{
            const uuidfound = await User.findOne({ verifyuuid: uuid }, function (err,user) {
                if(err)
                    return false
                return user
            })
            if(uuidfound == null){
                return false
            }

            uuidfound.verifyuuid = '';
            uuidfound.verified = true;
            await uuidfound.save();

            return true
        } catch(e){
            console.log(e)
            return false
        }
    }
}