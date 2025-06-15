export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // or Date if you parse it
    updatedAt: string; // or Date if you parse it
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // or Date
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
