"use client";

import { useCallback, useEffect, useState } from "react";
import { CreateProductRequest, Product } from "../types/product";
import { createProduct, deleteProduct, getProduct, getProducts, getProductsByCategory, getSaleProducts, updateProduct } from "../services/product.service";



export function useProducts() {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const fetchProducts = useCallback(async () => {
try {
setError(null);

  const result = await getProducts();

  setProducts(result.data);
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Failed to fetch products"
  );
}

}, []);

useEffect(() => {
let mounted = true;

async function loadProducts() {
  try {
    const result = await getProducts();

    if (mounted) {
      setProducts(result.data);
      setError(null);
    }
  } catch (err) {
    if (mounted) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch products"
      );
    }
  } finally {
    if (mounted) {
      setLoading(false);
    }
  }
}

loadProducts();

return () => {
  mounted = false;
};

}, []);

async function fetchProduct(id: string) {
return getProduct(id);
}

async function fetchSaleProducts() {
return getSaleProducts();
}

async function fetchCategoryProducts(categoryName: string) {
return getProductsByCategory(categoryName);
}

async function addProduct(data: CreateProductRequest) {
const result = await createProduct(data);

await fetchProducts();

return result;

}

async function editProduct(
id: string,
data: CreateProductRequest
) {
const result = await updateProduct(id, data);

await fetchProducts();

return result;

}

async function removeProduct(id: string) {
const result = await deleteProduct(id);

await fetchProducts();

return result;

}

return {
products,
loading,
error,
fetchProducts,
fetchProduct,
fetchSaleProducts,
fetchCategoryProducts,
addProduct,
editProduct,
removeProduct,
};
}
