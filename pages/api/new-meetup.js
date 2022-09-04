// api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  console.log(MongoClient);
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://iammardonbek:(Mardon090599)@cluster0.mc3jmbu.mongodb.net/meetups=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    if (res.status >= 400) {
      return res.status(400).json({
        error: "There was an error",
      });
    } else {
      return res.status(201).json({ message: "Message inserted!" });
    }
  }
}
export default handler;
