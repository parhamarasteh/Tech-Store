"use client";

import { useCallback, useEffect, useState } from "react";

import {
getCategories,
getCategory,
createCategory,
updateCategory,
deleteCategory,
} from "../services/category.service";
import { Category, CreateCategoryRequest } from "../types/category";



export function useCategories() {
const [categories, setCategories] = useState<Category[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const fetchCategories = useCallback(async () => {
try {
setError(null);

  const result = await getCategories();

  setCategories(result.data);
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Failed to fetch categories"
  );
}

}, []);

useEffect(() => {
let mounted = true;

async function loadCategories() {
  try {
    const result = await getCategories();

    if (mounted) {
      setCategories(result.data);
      setError(null);
    }
  } catch (err) {
    if (mounted) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch categories"
      );
    }
  } finally {
    if (mounted) {
      setLoading(false);
    }
  }
}

loadCategories();

return () => {
  mounted = false;
};

}, []);

async function fetchCategory(id: string) {
return getCategory(id);
}

async function addCategory(
data: CreateCategoryRequest
) {
const result = await createCategory(data);

await fetchCategories();

return result;

}

async function editCategory(
id: string,
data: CreateCategoryRequest
) {
const result = await updateCategory(id, data);

await fetchCategories();

return result;

}

async function removeCategory(id: string) {
const result = await deleteCategory(id);

await fetchCategories();

return result;

}

return {
categories,
loading,
error,
fetchCategories,
fetchCategory,
addCategory,
editCategory,
removeCategory,
};
}
