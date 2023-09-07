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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { UpdateProductDTO, productDTO } from './product.dto';
import { ProductEntity } from './product.entity';
import { EditShopDTO, SellerDTO } from './seller.dto';
import { SessionGuard } from 'src/Member/session.guards';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // Add Shop
  @Post('/addsellerdetails')
  @UseInterceptors(
    FileInterceptor('shopPicture', {
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
    @Body() seller: SellerDTO,
    @UploadedFile() shopPicture: Express.Multer.File,
  ) {
    seller.shopPicture = shopPicture.filename;
    return await this.sellerService.addSellerDetails(seller, session.memberID);
  }

  //Show Profile Details
  @UseGuards(SessionGuard)
  @Get('/showprofiledetails')
  showProfileDetails(@Session() session) {
    const memberID = session.memberID;
    return this.sellerService.showProfileDetails(session.memberID);
  }

  // Show Profile Picture
  @Get('/showprofilepicture')
  @UseGuards(SessionGuard)
  async showProfilePicture(@Session() session, @Res() response) {
    const profilePicture = await this.sellerService.showProfilePicture(
      session.memberID,
    );
    response.sendFile(profilePicture, { root: './pictures/profile_pictures' });
  }

  // Edit Shop
  @Put('/editshop')
  @UseGuards(SessionGuard)
  editProfileDetails(@Session() session, @Body() editShop: EditShopDTO) {
    return this.sellerService.editShop(session.memberID, editShop);
  }

  //Add Product
  @Post('/addproduct')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('productPicture', {
      fileFilter(req, file, callback) {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          callback(null, true);
        } else {
          callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: './pictures/product_pictures',
        filename(req, file, callback) {
          callback(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async addProduct(
    @Session() session,
    @Body() product: productDTO,
    @UploadedFile() productPicture: Express.Multer.File,
  ): Promise<ProductEntity> {
    const memberID = session.memberID;
    product.picture = productPicture.filename;
    return await this.sellerService.addProduct(memberID, product);
  }

  // Get All Product
  @Get('/getAllProduct')
  async getAllProduct(@Session() session) {
    const memberID = session.memberID;
    return await this.sellerService.getAllProduct(memberID);
  }

  // Get Product
  @Get('/getProduct/:id')
  async getProduct(@Param('id') id) {
    return await this.sellerService.getProduct(id);
  }

  // Get Product Image by ID
  @Get('/getProductPicture/:id')
  async getProductPicture(@Param('id') id, @Res() response) {
    const profilePicture = await this.sellerService.getProductPicture(id);
    response.sendFile(profilePicture, { root: './pictures/product_pictures' });
  }

  // Edit Product
  @Put('/updateproduct')
  updateProduct(@Body() editProduct: UpdateProductDTO) {
    return this.sellerService.updateProduct(editProduct);
  }

  // Delete Product
  @Delete('/deleteproduct/:productID')
  async deleteProduct(@Param('productID') productID: number) {
    return await this.sellerService.deleteProduct(productID);
  }
}
