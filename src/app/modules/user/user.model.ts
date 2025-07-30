import { model, Schema } from "mongoose"
import { IsActive, IUser, Role } from "./user.interface"

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
    }
},{
    timestamps:true,
    versionKey:false
})

export const User = model<IUser>("User", userSchema)