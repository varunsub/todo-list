const User = require("../models/User");
const Event = require("../models/Event");
const authorizeHelper = require('./authorizeHelper')

module.exports = {
    async getList(req){
        try{
            let auth = {userId:req.user, verificationToken: req.authorization}
            const authorizeCode =  await authorizeHelper.authorize(auth);
            console.log(authorizeCode)
            if(authorizeCode.errorCode == 0){
                const events = await Event.find({userId:authorizeCode.parsedUserID},function(err,event){
                    if(err) console.log(err);
                    console.log(event);
                });
                return events;
            }
        }
        catch(e){
            console.log(e)
        }
    }
}