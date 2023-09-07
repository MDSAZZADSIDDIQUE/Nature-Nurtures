import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Post,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MemberDTO, UserDTO } from './Member/member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/registration')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      fileFilter(req, file, callback) {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          callback(null, true);
        } else {
          callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 1000000 },
      storage: diskStorage({
        destination: './pictures/profile_pictures',
        filename(req, file, callback) {
          callback(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async registerMember(
    @Session() session,
    @Body() member: MemberDTO,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    member.profilePicture = profilePicture.filename;
    if (member.password !== member.confirmPassword) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'Password and confirm password does not match.',
      });
    }
    const memberDetails = await this.appService.registerMember(member);
    session.email = memberDetails.email;
    session.memberID = memberDetails.memberID;
    return memberDetails;
  }

  @Post('/login')
  async login(@Session() session, @Body() member: UserDTO) {
    const memberDetails = await this.appService.login(member);
    session.memberID = memberDetails.memberID;
    session.email = memberDetails.email;
    console.log(session.memberID);
    return memberDetails;
  }
}
