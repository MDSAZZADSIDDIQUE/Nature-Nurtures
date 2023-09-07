import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { ProductEntity } from 'src/Seller/product.entity';
import { SellerEntity } from 'src/Seller/seller.entity';
import { SellerModule } from 'src/Seller/seller.module';
import { OrderEntity } from './order.entity';
import { BlogEntity } from './blog.entity';
import { ChatEntity } from './chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberEntity,
      ProductEntity,
      SellerEntity,
      OrderEntity,
      BlogEntity,
      ChatEntity,
    ]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
