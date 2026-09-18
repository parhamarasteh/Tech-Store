import { CategoriesResponse, Category, CategoryMutationResponse, CreateCategoryRequest } from "../types/category";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";




export async function getCategories(): Promise<CategoriesResponse> {
  const response = await fetch(
    `${API_URL}/api/category`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch categories"
    );
  }

  return result;
}


export async function getCategory(
  id: string
): Promise<Category> {
  const response = await fetch(
    `${API_URL}/api/category/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Category not found"
    );
  }

  return result;
}


export async function createCategory(
  data: CreateCategoryRequest
): Promise<CategoryMutationResponse> {
  const response = await fetch(
    `${API_URL}/api/category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create category"
    );
  }

  return result;
}


export async function updateCategory(
  id: string,
  data: CreateCategoryRequest
): Promise<CategoryMutationResponse> {
  const response = await fetch(
    `${API_URL}/api/category/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update category"
    );
  }

  return result;
}


export async function deleteCategory(
  id: string
): Promise<CategoryMutationResponse> {
  const response = await fetch(
    `${API_URL}/api/category/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete category"
    );
  }

  return result;
}
