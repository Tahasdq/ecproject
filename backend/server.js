import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import stripe from '../frontend/src/pages/stripe/stripe.js';
// import cartToNull from './routes/cartToNull.js';
import cors from "cors"

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { async } from "regenerator-runtime";

dotenv.config();

connectDB();

const app = express();
app.use(cors())

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);


const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is Runn....");
  });
}

//stripe route
app.use("/api/stripe" , stripe)
app.post("/checkout-success" , async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
})



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//runingin
