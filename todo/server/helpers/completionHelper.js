const Event = require("../models/Event")

module.exports = {
    async update(req){
        let id  = req.replace(/"/g,"");
        const myEvent=   await Event.findOne({ _id: id },
        function (err, event) {
            if(err){
                return {Error:"could not find task", errorCode:1};
            }
            return event;
        });
        myEvent.completed=true;
        await myEvent.save();
        return { errorCode:0};
    }
}