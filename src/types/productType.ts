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

export interface Category {
  name: string;
  slug: string;
  url: string;
}


export interface ProductStore {
  products: Product[];
  loading: boolean;
  total: number;

  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  selectedCategory: string;
  loadingCategory: boolean;
  sort: string;
  type: 'all' | 'category' | 'search';

  setSearch: (q: string) => void;
  setPage: (p: number) => void;
  setSort: (meta: string) => void;
  getParams: () => Record<string, string>;
  setSelectedCategory: (category: string) => void;
  getCategories: () => void;
  categories: Category[];

  fetchProducts: () => Promise<void>;
}