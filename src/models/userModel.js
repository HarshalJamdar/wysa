const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname : { type : String, required : true},
    goals : { type : [String], required : true, enum : ["I would go to sleep easily","I would sleep through the night","I'd wake up on time, refreshed"]},
    struggle : { type : String, required : true,enum : ['Less than 2 weeks','2 to 8 weeks','More than 8 weeks']},
    timeSleep : { type : String, required : true},
    timeWakeUp : { type : String, required : true},
    hrsSleep : { type : String, required : true},
    isDelete : false
},
{ timestamps : true}
)

module.exports = new mongoose.model("user",userSchema);