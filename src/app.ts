import Express ,{ Application, Request, Response } from "express";

const app: Application = Express()

app.get('/', (req: Request, res: Response) => {
    res.json("Showwcase")
});


app.listen(3000, () => {console.log("Server started");
})