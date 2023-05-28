import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
