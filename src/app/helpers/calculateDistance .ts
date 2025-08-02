export const calculateDistance = (
    pickup: { lat: number; lng: number },
    destination: { lat: number; lng: number }
    ): number => {
        const R = 6371; 
        const dLat = (destination.lat - pickup.lat) * (Math.PI / 180);
        const dLon = (destination.lng - pickup.lng) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(pickup.lat * (Math.PI / 180)) *
            Math.cos(destination.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
};