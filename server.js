import mongoose from "mongoose";
import dotenv from 'dotenv'
import app from "./app.js";

dotenv.config({ path: './config.env' });

// -------Database Connection -----------//
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    }) .then(() => console.log('DB connection successful!'));
const port = process.env.PORT || 3000;

// -- Server Connection -----------//
app.listen(port , () => {
    console.log(`Listening on port ${port}`)
})