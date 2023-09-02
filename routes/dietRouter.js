import express from "express";
import { getFoods } from "../database/users.js";

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
        return res.status(200).json({message:"success", response:true, userBmi:bmi.toFixed(1), token:true});
    } catch (error) {
        return res.status(500).send("server error");
    }
})

dietRouter.post("/diet-suggestion", async(req, res)=>{
    try {
        let {bmi} = req.body;
        // console.log(typeof(bmi));
        let userBmi = bmi;
        let minValue, maXvalue;
        if(userBmi<=18.5){
            minValue = 0;
            maXvalue = 18.5
        }
        else if(userBmi>=25.0 && userBmi<=29.9){
            minValue = 25.0;
            maXvalue = 29.9;
        }
        else if(userBmi>=18.6 && userBmi<=24.9){
            minValue = 18.6;
            maXvalue = 24.9;
        }
        else if(userBmi>=30.0 && userBmi<=44.9){
            minValue = 30.0;
            maXvalue = 49.9;
        }
        // console.log(typeof(userBmi));
        let getFoodSuggestion = await getFoods(minValue, maXvalue);
        // console.log(getFoodSuggestion)
        return res.status(200).send(getFoodSuggestion);
    } catch (error) {
        return res.status(500).send("server error");
    }
})
dietRouter.post("/insert", async(req, res)=>{
    let data = req.body;
    let result = await insertData(data);
    return res.send(result);
})
export let bmiRouter = dietRouter; 