import express from "express";
import cors from "cors";
import 'dotenv/config'
import db from "./src/db/index.js"

const app =  express();

app.use(cors());
app.use(express.json());