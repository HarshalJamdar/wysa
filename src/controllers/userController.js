
const userModel = require('../models/userModel');
const { isValid, isValidTime } = require('../utilities/validators');

const userDetails = async function(req,res){
    try{
        let { nickname,goals,struggle,timeSleep,timeWakeUp,hrsSleep } = req.body;

    //--request body validation
        if(Object.keys(req.body).length === 0) return res.status(400).send({status : false, msg : "Invalid request. Please send data."});

    //--validating inputs
        if(!isValid(nickname)) return res.status(400).send({ status : false, msg : "Please enter valid name" });
        if(!isValid(goals)) return res.status(400).send({ status : false, msg : "Field should not be empty" });
        if(!isValid(struggle)) return res.status(400).send({ status : false, msg : "Field should not be empty" });
       
        if(!isValid(timeSleep)) return res.status(400).send({ status : false, msg : "Field should not be empty" });
        if(!isValidTime(timeSleep)) return res.status(400).send({ status : false, msg : "Please provide valid time" });

        if(!isValid(timeWakeUp)) return res.status(400).send({ status : false, msg : "Field should not be empty" });
        if(!isValidTime(timeWakeUp)) return res.status(400).send({ status : false, msg : "Please provide valid time" });

        if(!isValid(hrsSleep)) return res.status(400).send({ status : false, msg : "Field should not be empty" });
        
    //--creating user document
        let userData = await userModel.create({ nickname,goals,struggle,timeSleep,timeWakeUp,hrsSleep })
        console.log(userData);

    //--calculating time in hrs
        let s1 = timeSleep.slice(-2);
        let timeArr1 = timeSleep.slice(0, -2).split(":");
        t1=((timeArr1[0]*60)+(timeArr1[1]*1))/60;

        let s2 = timeWakeUp.slice(-2);
        let timeArr2 = timeWakeUp.slice(0, -2).split(":");
        t2=((timeArr2[0]*60)+(timeArr2[1]*1))/60;

    //--calculating difference between two times
        let diff = 0;
        if(s1===s2 && t2>t1) diff = t2-t1;
        else if(s1===s2 && t2<t1) diff = (t2+24)-t1;
        else if(s1!==s2 && t1===0 && t2 === 12) diff = 12;
        else if(s1!==s2 && t2===0 && t1 === 12) diff = 12;
        else if(s1!==s2) diff = (t2+12)-t1;
        
    //--calculating sleep percentage.
        let hrs = hrsSleep.split(" ").slice(0,1)
        hrs = hrs[0]
        let percentage = 0, result=0
        if(diff <= hrs || hrs >= 8) percentage = "100%"  ;
        else if(diff>hrs){
            result = Math.ceil((hrs/diff) * 100);
            percentage = result+"%";
        }

    //--sending response
        if(result<80) return res.status(201).send({status:true, msg:"Successful", data:`You seem to have a sleep efficiency of ${percentage}. We'll get this up to 80%`});
        else return res.status(201).send({status:true, msg:"Successful", data:`You seem to have a sleep efficiency of ${percentage}. That's good`})
    
    }catch(err){
        return res.status(500).send({ status: false, error: err.message })
    }
}

module.exports={userDetails};