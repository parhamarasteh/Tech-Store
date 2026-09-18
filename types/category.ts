export interface Category {
  _id: string;
  name: string;
  en_name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface CreateCategoryRequest {
    name?: string;
    en_name?: string;
    image?: string;
  }
  
  export interface CategoryResponse {
    success: boolean;
    data: Category;
  }
  
  export interface CategoryMutationResponse {
    success: boolean;
    message: string;
    data?: Category;
    categoryId?: string;
    category?: Category;
  }