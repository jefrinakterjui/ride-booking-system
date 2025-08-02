/* eslint-disable no-unused-vars */
export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
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
export enum AvailabilityStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
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
    availabilityStatus?: AvailabilityStatus;
    totalRidesRequested?: number;
    totalRidesCompleted?: number;
}