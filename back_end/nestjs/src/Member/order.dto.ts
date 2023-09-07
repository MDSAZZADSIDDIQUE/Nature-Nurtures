import { IsNotEmpty, IsString } from 'class-validator';

export class orderDTO {
  orderID: number;
  orderDate: Date;
  orderStatus: string;
  totalAmount: number;
  shippingAddress: string;
  member: any;
  products: any[];
}
