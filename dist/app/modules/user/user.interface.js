"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityStatus = exports.ApprovalStatus = exports.Role = exports.IsActive = void 0;
/* eslint-disable no-unused-vars */
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["RIDER"] = "RIDER";
    Role["DRIVER"] = "DRIVER";
})(Role || (exports.Role = Role = {}));
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "PENDING";
    ApprovalStatus["APPROVED"] = "APPROVED";
    ApprovalStatus["SUSPENDED"] = "SUSPENDED";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
var AvailabilityStatus;
(function (AvailabilityStatus) {
    AvailabilityStatus["ONLINE"] = "ONLINE";
    AvailabilityStatus["OFFLINE"] = "OFFLINE";
})(AvailabilityStatus || (exports.AvailabilityStatus = AvailabilityStatus = {}));
