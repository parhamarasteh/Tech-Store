"use client";

import { useCallback, useEffect, useState } from "react";

import {
getBrands,
getBrand,
createBrand,
updateBrand,
deleteBrand,
} from "../services/brand.service"

import { Brand, CreateBrandRequest } from "../types/brand";

export function useBrands() {
const [brands, setBrands] = useState<Brand[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const fetchBrands = useCallback(async () => {
try {
setError(null);

  const result = await getBrands();

  setBrands(result.data);
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Failed to fetch brands"
  );
}

}, []);

useEffect(() => {
let mounted = true;

async function loadBrands() {
  try {
    const result = await getBrands();

    if (mounted) {
      setBrands(result.data);
      setError(null);
    }
  } catch (err) {
    if (mounted) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch brands"
      );
    }
  } finally {
    if (mounted) {
      setLoading(false);
    }
  }
}

loadBrands();

return () => {
  mounted = false;
};

}, []);

async function fetchBrand(id: string) {
return getBrand(id);
}

async function addBrand(data: CreateBrandRequest) {
const result = await createBrand(data);

await fetchBrands();

return result;

}

async function editBrand(
id: string,
data: CreateBrandRequest
) {
const result = await updateBrand(id, data);

await fetchBrands();

return result;

}

async function removeBrand(id: string) {
const result = await deleteBrand(id);

await fetchBrands();

return result;

}

return {
brands,
loading,
error,
fetchBrands,
fetchBrand,
addBrand,
editBrand,
removeBrand,
};
}
