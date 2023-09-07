export class productDTO {
  productID: number;
  productName: string;
  price: any;
  description: string;
  category: string;
  tags: string;
  availabilty: string;
  supplier: string;
  ratings: number;
  reviews: any;
  picture: string;
  seller: any;
}

export class UpdateProductDTO {
  productID: number;
  property: string;
  value: string;
}

export class AddToCartDTO {
  productID: string;
}

export class SearchProductDTO {
  productName: string;
}

export class commentDTO {
  productID: number;
  message: string;
}
