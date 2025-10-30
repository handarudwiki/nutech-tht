import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRoute from "./routes/user.route";
import bannerRoute from "./routes/banner.route";
import { errorMiddleware } from "./middlewares/error.midleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use(helmet());

app.use("", userRoute);
app.use("/banners", bannerRoute);

app.use(errorMiddleware)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});