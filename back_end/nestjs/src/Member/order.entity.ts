import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberEntity } from './member.entity';
import { ProductEntity } from 'src/Seller/product.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  orderID: number;

  @Column({ name: 'order_date', type: 'date' })
  orderDate: Date;

  @Column({ name: 'order_status', type: 'varchar', length: 255 })
  orderStatus: string;

  @Column({ name: 'total_amount', type: 'double precision' })
  totalAmount: number;

  @Column({ name: 'shipping_address', type: 'varchar', length: 255 })
  shippingAddress: string;

  @ManyToOne(() => MemberEntity, (member) => member.orders)
  member: MemberEntity;

  @OneToMany(() => ProductEntity, (product) => product.order)
  products: ProductEntity[];
}
