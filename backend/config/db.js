import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
      console.log("Database Connected..!!");
    })
    .catch((err) => {
      console.log("Error : ", err);
    });
};

export default connectDB;
