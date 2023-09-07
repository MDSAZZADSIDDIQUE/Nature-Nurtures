import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDTO, productDTO } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { SellerEntity } from './seller.entity';
import { EditShopDTO, SellerDTO } from './seller.dto';
import { MemberEntity } from 'src/Member/member.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(SellerEntity)
    private sellerRepository: Repository<SellerEntity>,
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
  ) {}

  // Add Seller Details
  async addSellerDetails(seller: SellerDTO, memberID): Promise<SellerEntity> {
    seller.memberID = memberID;
    return await this.sellerRepository.save(seller);
  }

  // Show Profile Details
  async showProfileDetails(memberID) {
    return await this.sellerRepository.findOneBy({ memberID: memberID });
  }

  // Show profile picture
  async showProfilePicture(memberID) {
    const profileDetails = await this.sellerRepository.findOneBy({
      memberID: memberID,
    });

    return profileDetails.shopPicture;
  }

  // Edit Shop
  async editShop(memberID, editShop: EditShopDTO) {
    const profileDetails = await this.sellerRepository.findOneBy({
      memberID: memberID,
    });

    const property = editShop.property;
    const value = editShop.value;

    profileDetails[property] = value;

    return await this.sellerRepository.save(profileDetails);
  }

  // Add Product
  async addProduct(memberID, product: productDTO): Promise<ProductEntity> {
    const sellerDetails = await this.sellerRepository.findOneBy({
      memberID: memberID,
    });
    product.seller = sellerDetails;
    product.supplier = sellerDetails.shopName;
    product.ratings = 0;
    product.reviews = {};
    return await this.productRepository.save(product);
  }

  // Get All Product
  async getAllProduct(memberID) {
    const products = await this.productRepository.find({
      relations: {
        seller: true,
      },
    });
    return products;
  }

  // Get Product
  async getProduct(id) {
    const product = await this.productRepository.findOneBy({
      productID: id,
    });
    return product;
  }

  // GetProductImage
  async getProductPicture(id) {
    const profileDetails = await this.productRepository.findOneBy({
      productID: id,
    });

    return profileDetails.picture;
  }

  // Edit product
  async updateProduct(editProduct: UpdateProductDTO) {
    const product = await this.productRepository.findOneBy({
      productID: editProduct.productID,
    });
    if (product == null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }
    if (product[editProduct.property] == undefined) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Property not found',
      });
    }
    product[editProduct.property] = editProduct.value;
    return await this.productRepository.save(product);
  }

  // Delete Product
  async deleteProduct(productID) {
    return await this.productRepository.delete({ productID: productID });
  }
}
