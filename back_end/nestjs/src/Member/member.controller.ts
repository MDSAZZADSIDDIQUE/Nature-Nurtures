import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { EditMemberDTO, MemberDTO } from './member.dto';
import {
  SearchProductDTO,
  commentDTO,
  productDTO,
} from 'src/Seller/product.dto';
import { orderDTO } from './order.dto';
import { BlogDTO } from './blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ChatDTO } from './chat.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  //Show Profile Details
  @Get('/showprofiledetails')
  showProfileDetails(@Session() session) {
    const memberID = session.memberID;
    return this.memberService.showProfileDetails(session.memberID);
  }

  //Show Profile Picture
  @Get('/showprofilepicture')
  async showProfilePicture(@Session() session, @Res() response) {
    const profilePicture = await this.memberService.showProfilePicture(
      session.memberID,
    );
    response.sendFile(profilePicture, { root: './pictures/profile_pictures' });
  }

  //Edit Profile Details
  @Put('/editprofiledetails')
  editProfileDetails(@Session() session, @Body() editMember: EditMemberDTO) {
    return this.memberService.editProfileDetails(session.memberID, editMember);
  }

  // Shop
  @Get('/shop')
  async shop() {
    return await this.memberService.shop();
  }

  @Delete('/deleteproduct')
  async deleteProduct(@Body() product: productDTO) {
    return await this.memberService.deleteProduct(product);
  }

  // Add to Cart
  @Post('/addtocart')
  addToCart(@Session() session, @Body() order: orderDTO) {
    return this.memberService.addToCart(session.memberID, order);
  }

  //Get all Orders
  @Get('/getAllOrders')
  async getAllOrders(@Session() session) {
    return this.memberService.getAllOrders(session.memberID);
  }

  // Cancel order
  @Delete('/cancelorder/:orderID')
  async cancelOrder(@Param('orderID') orderID: number) {
    return await this.memberService.cancelOrder(orderID);
  }

  // Confirm Order
  @Put('/confirmorder/:orderID')
  async confirmorder(@Param('orderID') orderID: number) {
    return await this.memberService.confirmOrder(orderID);
  }

  // Publish Blogs
  @Post('/publishblog')
  @UseInterceptors(
    FileInterceptor('blogPicture', {
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
  async publishBlog(
    @Session() session,
    @Body() blog: BlogDTO,
    @UploadedFile() blogPicture: Express.Multer.File,
  ) {
    blog.blogPicture = blogPicture.filename;
    return await this.memberService.publishBlog(session.memberID, blog);
  }

  // Read BLogs
  @Get('/readblogs')
  async readBlogs() {
    return await this.memberService.readBlogs();
  }

  //Show Profile Picture
  @Get('/showblogpicture/:blogID')
  async showBlogPicture(@Param('blogID') blogID, @Res() response) {
    const profilePicture = await this.memberService.showBlogPicture(blogID);
    response.sendFile(profilePicture, { root: './pictures/profile_pictures' });
  }

  //Show Profile Picture
  @Post('/chat')
  async chat(@Session() session, @Body() message: ChatDTO) {
    return await this.memberService.chat(session.memberID, message);
  }

  //Show Profile Picture
  @Get('/getchat')
  async getChat() {
    return await this.memberService.getChat();
  }

  //Get Profile
  @Get('/getprofile/:email')
  async getProfile(@Session() session, @Param('email') email) {
    return await this.memberService.getProfile(session.memberID, email);
  }

  // Mailer
  @Get('/sendcode')
  async sendCode() {
    return await this.memberService.sendCode();
  }

  @Get('/searchproduct')
  async searchProduct(@Body() product: SearchProductDTO) {
    return await this.memberService.searchProduct(product);
  }

  @Post('/addcomment')
  async postComment(@Body() product: commentDTO, @Session() session) {
    return await this.memberService.postComment(product, session.memberID);
  }
}
