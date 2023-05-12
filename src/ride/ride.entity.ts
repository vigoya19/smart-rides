import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { Rider } from '../rider/rider.entity';
import { PaymentSource } from '../payment-resource/payment-source.entity';
import { Position } from '../position/position.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver, { eager: true })
  @JoinColumn()
  driver: Driver;

  @ManyToOne(() => Rider, { eager: true })
  @JoinColumn()
  rider: Rider;

  @OneToOne(() => PaymentSource, { eager: true })
  @JoinColumn()
  paymentSource: PaymentSource;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column(() => Position)
  startPosition: Position;

  @Column(() => Position)
  endPosition: Position;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  value: number;
}
