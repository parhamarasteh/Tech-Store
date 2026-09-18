import type {
  CreateProductRequest,
  CreateProductResponse,
  Product,
  ProductsResponse,
} from "../types/product";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";


export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_URL}/api/product`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch products"
    );
  }

  return result;
}


export async function getSaleProducts(): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_URL}/api/product/sale`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch sale products"
    );
  }

  return result;
}


export async function getProduct(
  id: string
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/api/product/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Product not found"
    );
  }

  return result;
}


export async function getProductsByCategory(
  categoryName: string
) {
  const response = await fetch(
    `${API_URL}/api/product/category/${encodeURIComponent(
      categoryName
    )}`,
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


export async function createProduct(
  data: CreateProductRequest
): Promise<CreateProductResponse> {
  const response = await fetch(
    `${API_URL}/api/product`,
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
      result.message || "Failed to create product"
    );
  }

  return result;
}


export async function updateProduct(
  id: string,
  data: CreateProductRequest
) {
  const response = await fetch(
    `${API_URL}/api/product/${id}`,
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
      result.message || "Failed to update product"
    );
  }

  return result;
}


export async function deleteProduct(id: string) {
  const response = await fetch(
    `${API_URL}/api/product/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete product"
    );
  }

  return result;
}
