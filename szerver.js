import express, { request, response } from "express";
import cors from "cors";

import { authenticate, createUser, initializeTable } from "./szolgaltatas.js";

const app = express ();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, (error) => {
    if (error) console.log("Hiba a szerver elindításában");
    console.log("A szerver ezen a porton fut,", PORT);
    initializeTable();
})

app.post("/authenticate", (request, response) => {
   const userData = request.body;
   
   authenticate(userData)
   .then((message) => response.status(200).json({data: message}))
   .catch((error) =>response.status(401).json({data: error}));
});

app.post("/register", (request, response) => {
    const userData = request.body;
    console.log(userData);
    

    createUser(userData)
    .then((message) => response.status(201).json({data: message}))
    .catch((error) =>response.status(400).json({data: error}));
})

