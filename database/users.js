import { client } from "../db.js";
import jwt from "jsonwebtoken";

export function addUser(data){
    return client.db("users").collection("registeredUSer").insertOne(data)
}
export function findUser(email){
    return client.db("users").collection("registeredUSer").findOne({email:email});
}
export function generateToken(id){
    return jwt.sign(
        {id},
        process.env.SECRET_KEY
    )
}
export async function getFoods(mini, maxi){
    // console.log(mini, maxi);
    let a = await client.db("users").collection("bmi").find({$and:[{"bmi.min_range":{$gte:mini}},{"bmi.max_range":{$lte:maxi}}]}).toArray();
    // console.log(a);
    return a;
}


