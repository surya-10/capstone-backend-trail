import express from "express";

let dietRouter = express.Router();

dietRouter.post("/diet-app", async (req, res)=>{
    try {
        // console.log(req.body)
        let {age, height, weight} = req.body;
        // console.log(req.body)
        
        if(age<=2){
            return res.status(400).json({message:"age should be greater than 2", response:false, token:"success"})
        }
        let heightInMeter = height/100;
        let bmi = weight/(heightInMeter*heightInMeter);
        return res.status(200).json({message:"success", response:true, userBmi:bmi.toFixed(2), token:true});
    } catch (error) {
        return res.status(500).send("server error");
    }
})
export let bmiRouter = dietRouter; 