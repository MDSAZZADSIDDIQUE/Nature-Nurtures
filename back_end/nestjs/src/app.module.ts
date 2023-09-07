import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './Member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './Member/member.entity';
import { SellerModule } from './Seller/seller.module';
import { SellerEntity } from './Seller/seller.entity';
import { SocketGateway } from './socket.gateway';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MemberModule,
    SellerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nature_nurtures',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'mdsazzadsiddique0@gmail.com',
          pass: 'nabydemkpvwfcvzc',
        },
      },
    }),
    TypeOrmModule.forFeature([MemberEntity, SellerEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
