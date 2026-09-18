export interface Brand {
  _id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandsResponse {
  success: boolean;
  data: Brand[];
}

export interface CreateBrandRequest {
    name?: string;
    logo?: string;
  }
  
  export interface BrandResponse {
    success: boolean;
    data: Brand;
  }
  
  export interface BrandMutationResponse {
    success: boolean;
    message: string;
    data?: Brand;
    brandId?: string;
    brand?: Brand;
  }