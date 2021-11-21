import { Schema } from "mongoose";

interface Customer {
    name: String;
    email: String;
    age: Number
    games: [(
        {
            name: String;
            developer: String;
            price: Number;
        }
    )]
}

const CustomerSchema = new Schema<Customer>({
    name: String,
    email: String,
    age: Number,
    games: [
        {
            name: String,
            developer: String,
            price: Number,
        }
    ]
});

export { CustomerSchema }