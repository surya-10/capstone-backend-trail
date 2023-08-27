import { MongoClient } from "mongodb";

let connectionStr = "mongodb+srv://capstone:capstone@cluster0.hwlnde9.mongodb.net/?retryWrites=true&w=majority"
export async function mongoConnection(){
    let client = new MongoClient(connectionStr);
    await client.connect();
    console.log("Database connected");
    return client;
}
export const client = await mongoConnection();