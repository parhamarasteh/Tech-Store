import { Brand, BrandMutationResponse, BrandsResponse, CreateBrandRequest } from "../types/brand";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";




export async function getBrands(): Promise<BrandsResponse> {
  const response = await fetch(`${API_URL}/api/brand`, {
    method: "GET",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch brands");
  }

  return result;
}


export async function getBrand(
  id: string
): Promise<Brand> {
  const response = await fetch(
    `${API_URL}/api/brand/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Brand not found");
  }

  return result;
}


export async function createBrand(
  data: CreateBrandRequest
): Promise<BrandMutationResponse> {
  const response = await fetch(
    `${API_URL}/api/brand`,
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
    throw new Error(result.message || "Failed to create brand");
  }

  return result;
}


export async function updateBrand(
  id: string,
  data: CreateBrandRequest
): Promise<BrandMutationResponse> {
  const response = await fetch(
    `${API_URL}/api/brand/${id}`,
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
    throw new Error(result.message || "Failed to update brand");
  }

  return result;
}


export async function deleteBrand(
  id: string
): Promise<BrandMutationResponse> {
  const response = await fetch(
    `${API_URL}/api/brand/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete brand");
  }

  return result;
}
