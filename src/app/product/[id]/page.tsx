import { notFound } from 'next/navigation';
import { getProduct, products } from '@/lib/products';
import { ProductDetail } from '@/components/product-detail';

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(Number(id));
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
