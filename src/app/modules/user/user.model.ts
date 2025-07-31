import { model, Schema } from "mongoose"
import { ApprovalStatus, IsActive, IUser, Role } from "./user.interface"

const userSchema = new Schema<IUser>({
    name:{type: String , required: true},
    email:{type: String, required: true, unique:true},
    password:{type:String, required: true},
    role:{
        type: String,
        enum: Object.values(Role)
    },
    isDelete:{type: Boolean, default: false},
    isActive:{
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE
    },
    vehicleInfo: {
      vehicleType : { type: String },
      model: { type: String }
    },
    approvalStatus: {
      type: String,
      enum: Object.values(ApprovalStatus),
      default: ApprovalStatus.PENDING
    },

},{
    timestamps:true,
    versionKey:false
})

userSchema.pre("save", function (next) {
  if (this.role !== 'DRIVER') {
    this.vehicleInfo = undefined;
    this.approvalStatus = undefined;
  }
  next();
});

export const User = model<IUser>("User", userSchema)