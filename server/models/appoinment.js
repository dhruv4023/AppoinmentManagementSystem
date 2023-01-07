import mongoose from "mongoose";

const appoinmentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    location: String,
    description: String,
    AppoinmentList: {
      name: { type: String },
      contactNumber: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("appoinments", appoinmentSchema);
