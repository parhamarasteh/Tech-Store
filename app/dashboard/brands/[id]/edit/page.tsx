import BrandEditForm from "../../../../../components/admin/BrandEditForm";

interface EditBrandPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBrandPage({
  params,
}: EditBrandPageProps) {
  const { id } = await params;

  return <BrandEditForm id={id} />;
}