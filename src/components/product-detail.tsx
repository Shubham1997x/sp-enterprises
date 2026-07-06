'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import type { Product } from '@/lib/products';
import { themeFor } from '@/lib/products';
import { useQuote } from '@/context/quote-context';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { Logo } from '@/components/Logo';

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const router = useRouter();
  const { isSelected, toggle, add } = useQuote();
  const theme = themeFor(product.category);
  const selected = isSelected(product.id);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-lg font-semibold tracking-tight">S.P. Enterprises</span>
          </Link>
          <Button
            render={<Link href="/quote" />}
            nativeButton={false}
            className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 px-5"
          >
            Get a Quote
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to catalogue
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          <div className={`relative aspect-square rounded-3xl ${theme.bg} p-12 flex items-center justify-center`}>
            {product.tag && (
              <span className={`absolute top-5 left-5 text-xs font-medium px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText}`}>
                {product.tag}
              </span>
            )}
            <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
          </div>

          <div className="flex flex-col">
            <p className={`text-sm font-medium ${theme.text}`}>{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-neutral-900 mt-4">
              &#8377;{product.price} <span className="text-base font-normal text-neutral-400">/ piece</span>
            </p>
            <p className="text-neutral-500 mt-4 max-w-md">{product.description}</p>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.specs.map((spec) => (
                <div key={spec.label} className="rounded-2xl bg-neutral-50 px-4 py-3">
                  <dt className="text-xs text-neutral-400">{spec.label}</dt>
                  <dd className="text-sm font-medium text-neutral-800 mt-0.5">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => toggle(product.id)}
                className={`rounded-full px-6 h-11 border-neutral-200 ${selected ? 'bg-neutral-900 text-white hover:bg-neutral-800' : ''}`}
              >
                {selected ? <Check className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {selected ? 'Added to Quote List' : 'Add to Quote List'}
              </Button>
              <Button
                onClick={() => {
                  add(product.id);
                  router.push('/quote');
                }}
                className="rounded-full px-6 h-11 bg-neutral-900 text-white hover:bg-neutral-800"
              >
                Get Quote Now
              </Button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-xl font-semibold tracking-tight mb-6">More from {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
