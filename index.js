import express from "express";
import cors from "cors";
import { routes }  from "./routes.js";

const app =  express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

app.listen(process.env.PORT || 8888)