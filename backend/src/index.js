const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({
    path: "./.env"
})
const connectDB = require("./db/index");


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection FAILED !! ", err);
})
