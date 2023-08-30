import jwt from "jsonwebtoken"

export function isAuth(req, res, next){
    let token = req.headers["auth-token"];
    if(!token){
        return res.status(400).send({response:false, message:"Authentication failed"});
    }
    let result = jwt.verify(token, process.env.SECRET_KEY);
    next();
}