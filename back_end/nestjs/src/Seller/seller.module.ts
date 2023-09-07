import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { SellerEntity } from './seller.entity';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { MemberEntity } from 'src/Member/member.entity';
import { MemberModule } from 'src/Member/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, SellerEntity, MemberEntity]),
  ],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
