import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  paymentSourceId: number;
}
