/* eslint-disable no-unused-vars */
export enum IsActive {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum Role {
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  DRIVER = "DRIVER",
}
export interface IAuthProvider{
    provider:"credentials";
    providerId: string
}
export enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  SUSPENDED = "SUSPENDED",
}

export interface IUser {
    _id?:string;
    name: string;
    email: string;
    password: string;
    role: Role;
    isActive?: IsActive;
    isDelete?: boolean;
    auths?: IAuthProvider[];
    vehicleInfo?: {
      vehicleType: string
      model: string;
    };
    approvalStatus?: ApprovalStatus;
}