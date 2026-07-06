'use client';

import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useQuote } from '@/context/quote-context';

export function ProductCard({ product }: { product: Product }) {
  const { isSelected, toggle } = useQuote();
  const selected = isSelected(product.id);

  return (
    <div className="group h-full flex flex-col rounded-3xl border border-neutral-100 bg-white overflow-hidden transition-all duration-300 hover:border-neutral-200 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.12)]">
      <Link href={`/product/${product.id}`} className="block relative">
        <div className={`relative aspect-square  p-8 flex items-center justify-center`}>
          {product.tag && (
            <span className={`absolute top-3 left-3 z-10 text-xs font-medium px-3 py-1 rounded-full bg-slate-200 text-slate-700`}>
              {product.tag}
            </span>
          )}
          <button
            type="button"
            aria-pressed={selected}
            aria-label={selected ? `Remove ${product.name} from quote list` : `Add ${product.name} to quote list`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(product.id);
            }}
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${selected
              ? 'bg-neutral-900 border-neutral-900 text-white'
              : 'bg-white/80 backdrop-blur border-neutral-200 text-neutral-500 hover:border-neutral-400'
              }`}
          >
            {selected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full rounded-xl transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <p className={`text-xs font-medium text-slate-500`}>{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-neutral-900 leading-snug mt-1 hover:underline">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-900">
            &#8377;{product.price} <span className="font-normal text-neutral-400">/ piece</span>
          </span>
          <button
            type="button"
            onClick={() => toggle(product.id)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${selected
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
          >
            {selected ? 'Added' : 'Add to Quote'}
          </button>
        </div>
      </div>
    </div>
  );
}
