const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

class Connection {
    async execute() {
        try {
            await client.connect();
    
            const database = client.db("user");
            const users = database.collection("data");
    
            // Query for a movie that has the title 'Back to the Future'
            const query = { name: "Gabriel Ribeiro Santos" };
            const result = await users.findOne(query);
    
            console.log(result);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
}

export { Connection }