import { mudrasData } from '@/data/mudrasData';
import { MudraDetailClient } from './MudraDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return mudrasData.map((mudra) => ({
    slug: mudra.id,
  }));
}

export default async function MudraDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  return <MudraDetailClient slug={slug} />;
}
