import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  scores: {
    type: Map,
    default: {},
  }
});
userSchema.pre("save", async function (){
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

export { User };
