import mongoose from "mongoose";

const appoinmentSchema = mongoose.Schema(
  {
    username: {
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
    serviceName: {
      type: String,
      max: 30,
    },
    serviceTime: { Start: String, End: String },
    breakTime: { Start: String, End: String },
    appoinmentTime: String,
    location: {
      state: { type: String },
      district: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
    description: String,
    AppoinmentList: [
      {
        name: { type: String },
        email: { type: String },
        contactNumber: { type: String },
        dateTime: { type: String },
        message: { type: String },
        bookedOn: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("appointments", appoinmentSchema);