import { Column } from 'typeorm';

export class Position {
  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
