'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useQuote } from '@/context/quote-context';
import { Button } from '@/components/ui/button';

export function QuoteBar() {
  const { count } = useQuote();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
        >
          <div className="flex items-center justify-between gap-4 rounded-full bg-neutral-900 text-white pl-5 pr-2 py-2 shadow-xl shadow-black/20">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4" />
              <span>
                {count} {count === 1 ? 'product' : 'products'} selected
              </span>
            </div>
            <Button
              render={<Link href="/quote" />}
              nativeButton={false}
              className="rounded-full bg-white text-neutral-900 hover:bg-neutral-100 px-5"
            >
              Get Quote
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
