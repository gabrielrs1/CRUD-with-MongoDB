import express from "express";
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.json());

const uri = "mongodb://localhost:27017";

MongoClient.connect(uri, (err, client) => {
    if(err) return console.log("Deu erro!");

    const database = client.db("user");

    const users = database.collection("data");

    app.post("/user", async (request, response) => {
        const { name, age } = request.body;

        const result = await users.insertOne({
            name,
            age
        });

        return response.json(result);
    });

    app.get("/user", async (request, response) => {
        const result = await users.findOne(
            { name: "Gabriel Ribeiro Santos"},
            {
                sort: { rating: -1 }
            }
        );

        return response.json(result);
    });

    app.put("/user", async (request, response) => {
        const { name } = request.body;

        const result = await users.updateOne(
            { age: 18 },
            {
                $set: {
                    name
                },
            },
            { upsert: true }
        );

        return response.json(result)
    });

    app.delete("/user/:age", async (request, response) => {
        const { age } = request.params;

        const query = { age: Number(age) };
        console.log(query);

        const result = await users.deleteOne(query);

        if(result.deletedCount === 1) {
            return response.json("Deleted 1 documents");
        } else {
            return response.json("Deleted 0 documents");
        }
    });
});

app.listen(3000, () => console.log("Connected server (express)"));
