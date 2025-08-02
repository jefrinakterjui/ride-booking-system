import { model, Schema } from "mongoose"
import { ApprovalStatus, AvailabilityStatus, IsActive, IUser, Role } from "./user.interface"

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
    availabilityStatus: {
      type: String,
      enum: Object.values(AvailabilityStatus),
      default: AvailabilityStatus.OFFLINE
    },
    totalRidesRequested: {
      type: Number,
      default: 0
    },
    totalRidesCompleted: {
      type: Number,
      default: 0
    }

},{
    timestamps:true,
    versionKey:false
})

userSchema.pre("save", function (next) {
  if (this.role !== 'DRIVER') {
    this.vehicleInfo = undefined;
    this.approvalStatus = undefined;
    this.availabilityStatus = undefined;
    this.totalRidesCompleted = undefined;
  }
  if (this.role !== 'RIDER') {
    this.totalRidesRequested = undefined; 
  }
  next();
});

export const User = model<IUser>("User", userSchema)