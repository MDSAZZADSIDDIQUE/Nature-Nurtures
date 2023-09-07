import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { Repository } from 'typeorm';
import { EditMemberDTO, MemberDTO } from './member.dto';
import { commentDTO, productDTO } from 'src/Seller/product.dto';
import { ProductEntity } from 'src/Seller/product.entity';
import { orderDTO } from './order.dto';
import { OrderEntity } from './order.entity';
import { BlogEntity } from './blog.entity';
import { ChatDTO } from './chat.dto';
import { ChatEntity } from './chat.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    private mailerService: MailerService,
  ) {}

  // Show Profile Details
  async showProfileDetails(memberID) {
    return await this.memberRepository.findOneBy({ memberID: memberID });
  }

  // Show Profile Picture
  async showProfilePicture(memberID) {
    const profileDetails = await this.memberRepository.findOneBy({
      memberID: memberID,
    });

    return profileDetails.profilePicture;
  }

  async editProfileDetails(memberID, editMember: EditMemberDTO) {
    const profileDetails = await this.memberRepository.findOneBy({
      memberID: memberID,
    });

    const property = editMember.property;
    const value = editMember.value;

    profileDetails[property] = value;

    return await this.memberRepository.save(profileDetails);
  }

  async shop() {
    return await this.productRepository.find();
  }

  async deleteProduct(product: productDTO) {
    return await this.productRepository.delete({
      productID: product.productID,
    });
  }

  async addToCart(memberID, order: orderDTO) {
    const profileDetails = await this.memberRepository.findOneBy({
      memberID: memberID,
    });
    const arrayOfProducts = [];
    for (let productID of order.products) {
      arrayOfProducts.push(
        await this.productRepository.findOneBy({
          productID: productID,
        }),
      );
    }

    order.member = profileDetails;
    order.products = arrayOfProducts;
    return await this.orderRepository.save(order);
  }

  async getAllOrders(memberID) {
    const previousOrder = await this.orderRepository.find({
      relations: {
        member: true,
        products: true,
      },
    });
    return previousOrder;
  }

  async cancelOrder(orderID) {
    return await this.orderRepository.delete({ orderID: orderID });
  }

  async confirmOrder(orderID) {
    const order = await this.orderRepository.findOneBy({ orderID: orderID });
    order.orderStatus = 'Shipped';
    return await this.orderRepository.save(order);
  }

  async publishBlog(memberID, blog) {
    blog.memberID = memberID;
    const member = await this.memberRepository.findOneBy({
      memberID: memberID,
    });
    blog.author = member.firstName + ' ' + member.lastName;
    blog.date = new Date();
    blog.likes = 0;
    return await this.blogRepository.save(blog);
  }

  async readBlogs() {
    return await this.blogRepository.find();
  }

  async showBlogPicture(blogID) {
    const profileDetails = await this.blogRepository.findOneBy({
      blogID: blogID,
    });

    return profileDetails.blogPicture;
  }

  // chat
  async chat(memberID, message: ChatDTO) {
    const profileDetails = await this.memberRepository.findOneBy({
      memberID: memberID,
    });
    message.senderName = profileDetails.lastName;
    return this.chatRepository.save(message);
  }

  // chat
  async getChat() {
    return this.chatRepository.find();
  }

  async getProfile(memberID, email) {
    return await this.memberRepository.findOneBy({
      email: email,
    });
  }

  async sendCode() {
    await this.mailerService.sendMail({
      to: 'likhonsiddique01@gmail.com',
      subject: 'Forgotten Password Code',
      text: 'Your code is 9155',
    });
  }

  async searchProduct(product) {
    const productDetails = await this.productRepository.findOneBy({
      productName: product.productName,
    });
    return productDetails;
  }

  async postComment(product: commentDTO, memberID) {
    const productDetails = await this.productRepository.findOneBy({
      productID: product.productID,
    });
    const profileDetails = await this.memberRepository.findOneBy({
      memberID: memberID,
    });
    const updatedReviews = { ...productDetails.reviews };

    updatedReviews[profileDetails.firstName] = product.message;

    productDetails.reviews = updatedReviews;

    return await this.productRepository.save(productDetails);
  }
}
