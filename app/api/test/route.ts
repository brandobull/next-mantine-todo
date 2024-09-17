import { NextResponse } from "next/server";

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export async function GET() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("todo");
    const collection = database.collection("todo");

    const allData = await collection
      .find({ title: "Bad Boys for Life" })
      .toArray();
    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.error();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
