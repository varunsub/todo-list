const User = require("../models/User");
const authorizeHelper = require("../helpers/authorizeHelper")

module.exports = {
    async logout(req){
        try{
        let data = {
            userId:req.user,
            verificationToken: req.authorization
        }
        const authorizeCode = await  authorizeHelper.authorize(data);
        if(authorizeCode.errorCode == 0){
            let a = await User.findById(authorizeCode.parsedUserID,  async function (err,user){
                if(err){
                    return err;
                }
                user.token=''
                await user.save()
                return user
            });
            return {errorCode:  0}
        }
        }catch(e){
            console.log(e)
            return {errorCode:  3}
        }
    }
}