import CategoryEditForm from "../../../../../components/admin/CategoryEditForm";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  return <CategoryEditForm id={id} />;
}