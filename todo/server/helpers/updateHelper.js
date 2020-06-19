const User = require("../models/User");
const Event = require("../models/Event")
const authorizeHelper = require("../helpers/authorizeHelper")

module.exports = {
    async add(req){
        try{
        const authorizeCode = await  authorizeHelper.authorize(req);
            if(authorizeCode.errorCode == 0){
                let foundEvent = await Event.findByIdAndUpdate((req._id),{
                    userId:authorizeCode.parsedUserID,
                    taskName:req.title,
                    deadlineDate: req.deadlineDate,
                    deadlineHour: req.deadlineTime.substring(0, 2),
                    deadlineMinute: req.deadlineTime.substring(3, 5),
                    notification1: req.notification1,
                    notification2: req.notification2,
                    completed: false,
                    deadlineTime: req.deadlineTime
                });
                console.log(foundEvent)
                return {errorCode:  0}
            }
        else return authorizeCode;
        }catch(e){
            console.log(e)
            return {errorCode:  3}
        }
    }
}