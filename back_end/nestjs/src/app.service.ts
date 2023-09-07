import {
  HttpStatus,
  Injectable,
  NotFoundException,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './Member/member.entity';
import { Repository } from 'typeorm';
import { MemberDTO, UserDTO } from './Member/member.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
  ) {}
  // Registration
  async registerMember(member: MemberDTO): Promise<MemberEntity> {
    const salt = await bcrypt.genSalt();
    member.password = await bcrypt.hash(member.password, salt);
    const memberDetails = await this.memberRepository.findOneBy({
      email: member.email,
    });
    console.log(memberDetails);
    if (memberDetails !== null) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Password does not match',
      });
    } else {
      return await this.memberRepository.save(member);
    }
  }

  // Log in
  async login(user: UserDTO) {
    const email = user.email;
    const password = user.password;
    const memberDetails = await this.memberRepository.findOneBy({
      email: email,
    });
    if (memberDetails === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Member not found',
      });
    } else {
      if (await bcrypt.compare(password, memberDetails.password)) {
        return memberDetails;
      } else {
        throw new UnauthorizedException({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Password does not match',
        });
      }
    }
  }
}
