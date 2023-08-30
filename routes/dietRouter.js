import express from "express";

let dietRouter = express.Router();

dietRouter.post("/diet-app", (req, res)=>{
    try {
        
        let {age, height, weight} = req.body;
        console.log(req,body)
        if(age<=2){
            return res.status(400).json({messsgae:"age should be greater than 2", response:false})
        }
        let heightInMeter = height/100;
        let bmi = weight/(heightInMeter*heightInMeter);
        return res.status(200).json({messsgae:"success", response:true});
    } catch (error) {
        return res.status(500).send("server error");
    }
})
export let bmiRouter = dietRouter; 