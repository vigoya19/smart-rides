import { Ride } from '../../ride/ride.entity';
import { Position } from '../../position/position.entity';

export class DistanceService {
  private static readonly EARTH_RADIUS_KM = 6371;

  static haversine(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const dLat = DistanceService.toRadians(lat2 - lat1);
    const dLon = DistanceService.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(DistanceService.toRadians(lat1)) *
        Math.cos(DistanceService.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return DistanceService.EARTH_RADIUS_KM * c;
  }

  static toRadians(value: number): number {
    return (value * Math.PI) / 180;
  }

  static getFinalDistance(ride: Ride): number {
    return DistanceService.haversine(
      ride.startPosition.latitude,
      ride.startPosition.longitude,
      ride.endPosition.latitude,
      ride.endPosition.longitude,
    );
  }

  static getFinalDuration(startDate: Date, endDate: Date): number {
    const diffInMs: number = endDate.getTime() - startDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
    return diffInMinutes;
  }

  static completeRide(endPosition: Position, ride: Ride) {
    ride.endPosition = endPosition;
    ride.endDate = new Date();

    const distance = this.getFinalDistance(ride);
    const duration = this.getFinalDuration(ride.startDate, ride.endDate);

    ride.value = 3500;
    ride.value += distance * 1000;
    ride.value += duration * 200;
    ride.value = Math.round(ride.value * 100) / 100;
  }

  static calculateRideCost(ride: Ride): number {
    const baseCost = 3500;
    const costPerKm = 1000;
    const costPerMinute = 200;

    const distance = DistanceService.getFinalDistance(ride);
    const duration = DistanceService.getFinalDuration(
      ride.startDate,
      ride.endDate,
    );

    let value = baseCost;
    value += distance * costPerKm;
    value += duration * costPerMinute;
    value = Math.round(value * 100) / 100;

    return value;
  }
}
