import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
// const port = 3000;

// Parser
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("This is my Bi-Cycle Store application");
});

export default app;
