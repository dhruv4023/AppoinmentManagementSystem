import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    sid: {
      type: String,
      require: true,
      min: 2,
      max: 50,
      unique: true,
    },
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
    serviceTime: { start: { type: String }, end: { type: String } },
    breakTime: { start: { type: String }, end: { type: String } },
    appoinmentTime: String,
    location: {
      state: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
    holidays:[],
    chartData: [
      {
        year: {
          value: { type: String },
          total: [0, 0],
        },
        months: [
          {
            value: { type: String },
            total: [0, 0],
          },
        ],
        days: [
          {
            value: { type: String },
            total: [0, 0],
          },
        ],
      },
    ],
    description: { type: String },
    appointmentList: [
      {
        aid: { type: String },
        name: { type: String },
        email: { type: String },
        contactNumber: { type: String },
        dateTime: {
          date: { type: String },
          time: { type: String },
        },
        message: { type: String },
        status: { type: Number, default: 0 },
        bookedOn: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Services", serviceSchema);
