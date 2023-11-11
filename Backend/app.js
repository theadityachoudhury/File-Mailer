const express = require("express");
const cors = require("cors");
const email = require("./Routes/Mailer/mailer");
const { PORT } = require("./Config/db.js");


const app = express();

app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.get("/", async (req, res) => {
    res.send({
        data: {
            appName: "File-Mailer By StudySync",
            developedBy: "Aditya Choudhury",
            maintainedBy: "Aditya Choudhury",
            version: "1.0.0.5",
        },
        success: true,
    })
});

app.get("/api/health", (req, res) => {
    res.send({
        message: "Server is Up and running",
        success: true,
    });
});

app.use("/email", email);


app.use((req, res) => {
    res.status(404).json({
        reason: "invalid-request",
        message:
            "The endpoint you wanna reach is not available! Please check the endpoint again",
        success: false,
    });
});

app.listen(PORT, async () => {
    console.log(`Server started on PORT ${PORT}`);
});