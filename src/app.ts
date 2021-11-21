import express, { Request, Response } from "express";
import { model } from "mongoose";
import { CustomerSchema } from "./models/Customer";
import "./database"
import { ObjectId } from "bson";

interface Customer {
    name: String;
    email: String;
    age: Number;
    games: [{
        name: String;
        developer: String;
        price: Number;
    }]
}

const app = express();

app.use(express.json());

app.post("/user", async (request: Request, response: Response) => {
    const { name, email, age, games } = request.body;

    const customerModel = model<Customer>("customers", CustomerSchema);

    const alreadyExistCustomer = await customerModel.findOne({ email })

    if(alreadyExistCustomer) {
        return response.json("Customer exist!");
    }

    const customer = await customerModel.create({
        name,
        email,
        age,
        games
    });

    customer.save();

    return response.json(customer);
});

app.get("/user", async (request, response) => {
    const customerModel = model<Customer>("customers", CustomerSchema);

    const customer = await customerModel.find();

    return response.json(customer);
});

app.put("/user", async (request, response) => {
    const { name, email, age, games } = request.body;

    const customerModel = model<Customer>("customers", CustomerSchema);

    const alreadyExistCustomer = await customerModel.findOne({ email });

    if(!alreadyExistCustomer) {
        return response.json("Customer not exist!");
    }

    const customer = await customerModel.updateOne({ email }, {
        name,
        email,
        age,
        games
    });

    return response.json(customer);
});

app.delete("/user/:id", async (request, response) => {
    const { id } = request.params;

    const customerModel = model<Customer>("customers", CustomerSchema);

    const alreadyExistCustomer = await customerModel.findOne({ id });

    if(!alreadyExistCustomer) {
        return response.json("Customer not exist!");
    }

    await customerModel.deleteOne({ _id: new ObjectId(id) });

    return response.json("Customer deleted!")
});

app.listen(3000, () => console.log("Connected server (express)"));
