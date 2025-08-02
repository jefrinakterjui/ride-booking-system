"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = void 0;
const calculateDistance = (pickup, destination) => {
    const R = 6371;
    const dLat = (destination.lat - pickup.lat) * (Math.PI / 180);
    const dLon = (destination.lng - pickup.lng) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(pickup.lat * (Math.PI / 180)) *
            Math.cos(destination.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
};
exports.calculateDistance = calculateDistance;
