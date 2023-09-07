import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SellerEntity } from './seller.entity';
import { OrderEntity } from 'src/Member/order.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  productID: number;

  @Column({ name: 'product_name', type: 'varchar', length: 255 })
  productName: string;

  @Column({ name: 'price', type: 'double precision' })
  price: number;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'category', type: 'varchar', length: 255 })
  category: string;

  @Column({ name: 'tags', type: 'varchar', length: 255 })
  tags: string;

  @Column({ name: 'availabilty', type: 'varchar', length: 255 })
  availabilty: string;

  @Column({ name: 'rating', type: 'double precision', nullable: true })
  ratings: number;

  @Column({ name: 'reviews', type: 'varchar', nullable: true })
  reviews: any;

  @Column({ name: 'picture', type: 'varchar', length: 255 })
  picture: string;

  @ManyToOne(() => SellerEntity, (seller) => seller.products)
  seller: SellerEntity;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  order: OrderEntity;
}
