import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column()
  paymentId: string;

  @Column()
  status: string;

  constructor(reference, paymentId, status) {
    this.reference = reference;
    this.paymentId = paymentId;
    this.status = status;
  }
}
