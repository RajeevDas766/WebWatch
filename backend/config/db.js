import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://rajeevdas766_db_user:wCDEfvfg413FE265@cluster0.twmfjyq.mongodb.net/WatchSite").then(()=> console.log('DB Connected'))
}