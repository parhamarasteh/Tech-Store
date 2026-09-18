import MediaView from "../../../../components/admin/MediaView";

interface MediaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MediaDetailPage({
  params,
}: MediaPageProps) {
  const { id } = await params;

  return <MediaView id={id} />;
}