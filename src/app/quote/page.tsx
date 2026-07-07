'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Minus, Package, Plus, Trash2 } from 'lucide-react';
import { useQuote } from '@/context/quote-context';
import { getProduct } from '@/lib/products';
import { themeFor } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/Logo';

export default function QuotePage() {
  const { selectedIds, remove, clear } = useQuote();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const items = selectedIds
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const qty = (id: number) => quantities[id] ?? 1;
  const setQty = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, value) }));
  };

  const total = items.reduce((sum, p) => sum + p.price * qty(p.id), 0);

  const WHATSAPP_NUMBER = '917275336699';

  const buildWhatsAppMessage = () => {
    const lines = [
      `New quote request from ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      '',
      'Products:',
      ...items.map((p) => `- ${p.name} x${qty(p.id)} — ₹${(p.price * qty(p.id)).toLocaleString('en-IN')}`),
      '',
      `Estimated total: ₹${total.toLocaleString('en-IN')}`,
      form.message ? `\nNote: ${form.message}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-lg font-semibold tracking-tight">S.P. Enterprises</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to catalogue
        </Link>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Your quote list</h1>
        <p className="text-neutral-500 mt-2">
          Review the products you&apos;ve selected, then send us your details and we&apos;ll get back with pricing and availability.
        </p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-neutral-200 rounded-3xl mt-10">
            <Package className="w-12 h-12 text-neutral-200 mb-4" />
            <h2 className="text-lg font-medium text-neutral-700">Your quote list is empty</h2>
            <p className="text-neutral-400 mt-1">Browse the catalogue and add products to request a quote.</p>
            <Button render={<Link href="/" />} nativeButton={false} className="mt-6 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 px-6">
              Browse Catalogue
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 mt-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-500">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                <button onClick={clear} className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">
                  Clear all
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {items.map((product) => {
                  const theme = themeFor(product.category);
                  return (
                    <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-neutral-100 p-3">
                      <div className={`w-16 h-16 rounded-xl ${theme.bg} flex items-center justify-center shrink-0`}>
                        <img src={product.image} alt={product.name} className="object-contain w-full h-full p-1.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm text-neutral-900 truncate">{product.name}</p>
                        <p className={`text-xs ${theme.text}`}>{product.category}</p>
                        <p className="text-sm text-neutral-500 mt-0.5">&#8377;{product.price} / piece</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty(product.id) - 1)}
                          className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{qty(product.id)}</span>
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty(product.id) + 1)}
                          className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-4 px-1 text-sm">
                <span className="text-neutral-500">Estimated total</span>
                <span className="font-semibold text-neutral-900">&#8377;{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-100 p-6 h-fit">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Opening WhatsApp&hellip;</h3>
                  <p className="text-neutral-500 text-sm mt-1">
                    Thanks {form.name || 'there'}, your quote request has been prepared in WhatsApp. Just hit send there and our team will reply on {form.phone || 'your number'} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h3 className="font-semibold text-lg">Request a quote</h3>
                  <Input
                    required
                    placeholder="Full name"
                    className="h-11 rounded-xl"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    required
                    type="tel"
                    placeholder="Phone number"
                    className="h-11 rounded-xl"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Email (optional)"
                    className="h-11 rounded-xl"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <textarea
                    placeholder="Anything else we should know? (quantities, delivery city, etc.)"
                    rows={4}
                    className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 placeholder:text-neutral-400 resize-none"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <Button type="submit" className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 h-11 mt-2">
                    Send Quote via WhatsApp
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
