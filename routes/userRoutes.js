import express from "express";
import bcrypt from "bcrypt";
import { addUser, findUser, generateToken } from "../database/users.js";

let router = express.Router();

router.get("/check", (req, res)=>{
    try {
        return res.status(200).send({messsage:"working good"})
    } catch (error) {
        return res.status(500).send("server error");
    }
})

router.post("/signup", async(req, res)=>{
    try {
        let {username, password, email} = req.body;
        if(!username || !password || !email){
            return res.status(400).json({response:"Fill all details to sign up"})
        }
        let checkEmail = await findUser(email);
        if(checkEmail){
            return res.status(400).json({response:"This is email already registered"})
        }
        let saltValue = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, saltValue);
        req.body.password = hashedPassword;
        let result = await addUser(req.body)
        return res.send(result)
        
    } catch (error) {
        return res.status(500).send("server error");
    }
})

router.post("/login", async(req, res)=>{
    try {
        let {email, password} = req.body;
        if(!password || !email){
            return res.status(400).json({response:"Fill all details to sign up"})
        }
        let findAccount = await findUser(email);
        console.log(findAccount)
        if(!findAccount){
            return res.status(400).json({response:false})
        }
        let pasCheck = await bcrypt.compare(password, findAccount.password);
        if(!pasCheck){
            return res.status(400).json({response:"invalid"});
        }
        let gentoken = await generateToken(findAccount._id);
        return res.status(201).json({response:true, token:gentoken});

    } catch (error) {
        return res.status(500).send("server error");
    }
})
export let userRouter = router;