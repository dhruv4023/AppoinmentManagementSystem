import mongoose from "mongoose";

const appoinmentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    category: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    timeRage: String,
    location: {
      state: { type: String },
      district: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
    description: String,
    AppoinmentList: {
      name: { type: String },
      email: { type: String },
      contactNumber: { type: String },
      dateAndTime: { type: String },
      message: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("appoinments", appoinmentSchema);
