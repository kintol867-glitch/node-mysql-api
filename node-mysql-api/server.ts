import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./_middleware/error-handler";
import accountsController from "./accounts/accounts.controller";
import swaggerDocs from "./_helpers/swagger";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:4200",
    credentials: true,
  }),
);

// api routes
app.use("/accounts", accountsController);

// swagger docs route
app.use("/api-docs", swaggerDocs);

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;

const server = app.listen(port, () => console.log("Server listening on port " + port));

// Keep alive - ping self every 14 minutes to prevent Render free tier spin down
if (process.env.NODE_ENV === "production") {
  setInterval(() => {
    require("https").get(`https://node-mysql-api-ftxq.onrender.com/api-docs`, (res: any) => {
      console.log("Keep alive ping status:", res.statusCode);
    }).on("error", (err: any) => {
      console.log("Keep alive ping error:", err.message);
    });
  }, 840000);
}