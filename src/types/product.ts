export interface ProductType {
  _id: string;
  category: string;
  description: string;
  mainImage: {
    url: string;
    public_id: string;
    _id: string;
  };
  color: string;
  size: number[];
  name: string;
  owner: string;
  price: number;
  stock: number;
  subImages: {
    url: string;
    public_id: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductCardType {
  product: ProductType;
}
