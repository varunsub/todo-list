const User = require("../models/User");
const Event = require("../models/Event")
const authorizeHelper = require("../helpers/authorizeHelper")

module.exports = {
    async add(req){
        console.log(req)
        try{
        const authorizeCode = await  authorizeHelper.authorize(req);
            if(authorizeCode.errorCode == 0){
                let dHour = parseInt(req.deadlineTime.substring(0,2));
                let dMin = parseInt(req.deadlineTime.substring(3,5));
                let item =  new Event({
                    userId:authorizeCode.parsedUserID,
                    taskName:req.title,
                    deadlineDate: req.deadlineDate,
                    deadlineHour: dHour,
                    deadlineMinute: dMin,
                    notification1: req.notification1,
                    notification2: req.notification2,
                    completed: false,
                    deadlineTime: req.deadlineTime
                });
                console.log("test")
                await item.save();
                return {errorCode:  0}
            }
        else return authorizeCode;
        }catch(e){
            console.log(e)
            return {errorCode:  3}
        }
    }
}