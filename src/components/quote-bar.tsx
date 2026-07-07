'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, X } from 'lucide-react';
import { useQuote } from '@/context/quote-context';
import { Button } from '@/components/ui/button';

export function QuoteBar() {
  const { count, clear } = useQuote();

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
          <div className="flex items-center justify-between gap-4 rounded-full bg-gray-600 text-white pl-5 pr-2 py-2 shadow-xl shadow-indigo-900/20 border border-indigo-500">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FileText className="w-4 h-4" />
              <span>
                {count} {count === 1 ? 'product' : 'products'} selected
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                render={<Link href="/quote" />}
                nativeButton={false}
                className="rounded-full bg-white text-indigo-600 hover:bg-indigo-50 px-5 font-semibold shadow-sm"
              >
                Get Quote
              </Button>
              <button
                type="button"
                onClick={() => clear()}
                className="p-2 rounded-full hover:bg-gray-500 transition-colors"
                aria-label="Clear quote"
              >
                <X className="w-5 h-5 text-gray-200" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
