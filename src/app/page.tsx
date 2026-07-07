'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  Star,
  Users,
  Truck,
  ShieldCheck,
  Phone,
  Package,
  MapPin,
  Mail,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <h1 className="text-xl font-bold tracking-tight">S.P. Enterprises</h1>
          </div>



          <div className="flex items-center gap-3">
            <Button
              render={<a href="https://wa.me/917275336699" target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="outline"
              className="hidden sm:inline-flex rounded-full border-green-200 text-green-700 bg-green-50 hover:bg-green-100 hover:border-green-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Us
            </Button>
            <Button
              render={<a href="tel:07275336699" />}
              nativeButton={false}
              variant="outline"
              className="hidden sm:inline-flex rounded-full border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
            <Button
              render={<Link href="/quote" />}
              nativeButton={false}
              className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 px-5"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* About */}
      <section className="bg-neutral-50 border-b border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 mb-4">
              About Us
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Your trusted name for appliances, spares &amp; accessories
            </h2>
            <p className="text-neutral-500 mt-4 max-w-2xl leading-relaxed">
              S.P. Enterprises supplies genuine home appliances and spare parts to retailers and households across Uttar Pradesh. Based in Kanpur, we offer authentic products at fair wholesale prices with fast, reliable delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-neutral-100 flex flex-col gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <p className="font-semibold text-neutral-900 text-sm">Genuine Products</p>
              <p className="text-xs text-neutral-500">100% original, manufacturer-sourced stock</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-neutral-100 flex flex-col gap-2">
              <Truck className="w-5 h-5 text-indigo-600" />
              <p className="font-semibold text-neutral-900 text-sm">Pan-India Delivery</p>
              <p className="text-xs text-neutral-500">Reliable shipping to any pin code</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-neutral-100 flex flex-col gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <p className="font-semibold text-neutral-900 text-sm">Trusted Locally</p>
              <p className="text-xs text-neutral-500">Years of service to Kanpur retailers</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-neutral-100 flex flex-col gap-2">
              <Star className="w-5 h-5 text-indigo-600" />
              <p className="font-semibold text-neutral-900 text-sm">Wholesale Pricing</p>
              <p className="text-xs text-neutral-500">Fair rates for bulk &amp; retail orders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <main id="catalogue" className="container mx-auto px-4 sm:px-6 pt-10 pb-24">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Search products..."
            className="w-full pl-11 h-12 rounded-full bg-neutral-50 border-neutral-200 focus-visible:ring-indigo-400 text-neutral-900 placeholder:text-neutral-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex overflow-x-auto pb-2 mb-10 gap-2 scrollbar-hide">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className={`cursor-pointer whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={activeCategory + searchTerm}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants} className="h-full">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <Package className="w-14 h-14 text-neutral-200 mb-4" />
              <h2 className="text-xl font-medium text-neutral-700">No products found</h2>
              <p className="text-neutral-400 mt-1">Try adjusting your search or category filters.</p>
              <Button
                variant="outline"
                className="mt-6 rounded-full border-neutral-200"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Contact Us */}
      <footer className="bg-neutral-900 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left side: Contact Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Logo className="w-10 h-10" />
                  <h2 className="text-2xl font-bold text-white tracking-tight">S.P. Enterprises</h2>
                </div>
                <p className="text-neutral-400 mb-10 max-w-md leading-relaxed">
                  Your trusted wholesale supplier for Diwali lights, fans, and everyday essentials. Sourced, stocked, and shipped across Pan-India.
                </p>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-neutral-500 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Sunil Kumar <span className="font-normal text-neutral-400">(Proprietor)</span></p>
                      <p className="text-sm mt-1.5 leading-relaxed text-neutral-400">
                        110/43A, Jawahar Nagar, Near Post Office<br />
                        Kanpur 208012<br />
                        Uttar Pradesh, India
                      </p>
                      <a href="#" className="inline-flex items-center text-sm font-semibold text-neutral-200 mt-2 hover:text-white transition-colors">
                        Get Directions <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Phone className="w-5 h-5 text-neutral-500 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-0.5">Call Us</p>
                      <a href="tel:07275336699" className="font-semibold text-white hover:text-neutral-300 transition-colors">07275336699</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <MessageCircle className="w-5 h-5 text-neutral-500 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-0.5">WhatsApp</p>
                      <a href="https://wa.me/917275336699" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-neutral-300 transition-colors">Message Us</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Mail className="w-5 h-5 text-neutral-500 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-0.5">Email Us</p>
                      <a href="mailto:spe.knp@gmail.com" className="font-semibold text-white hover:text-neutral-300 transition-colors">spe.knp@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm text-neutral-500 font-medium">&copy; {new Date().getFullYear()} S.P. Enterprises. All rights reserved.</span>
                <div className="flex gap-3">
                  <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors group">
                    <svg className="w-4 h-4 fill-neutral-500 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02Z" /></svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors group">
                    <svg className="w-4 h-4 fill-neutral-500 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.66H9.36V9H12.8v1.56h.05c.48-.91 1.65-1.87 3.4-1.87 3.63 0 4.3 2.39 4.3 5.5v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM3.55 20.45h3.56V9H3.55v11.45z" /></svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors group">
                    <svg className="w-4 h-4 fill-neutral-500 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side: Contact Form */}
            <div className="bg-neutral-800/60 rounded-2xl p-8 lg:p-10 flex flex-col justify-center h-full">
              <h3 className="text-xl font-bold text-white mb-6">Send an Inquiry</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-300">Name</label>
                    <Input
                      placeholder="Your name"
                      className="text-white border-white/10 focus-visible:ring-neutral-400 rounded-xl bg-neutral-900/60 h-11 placeholder:text-neutral-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-300">Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-500 text-sm font-medium">
                        +91
                      </div>
                      <Input
                        placeholder="Mobile number"
                        className="pl-11 text-white border-white/10 focus-visible:ring-neutral-400 rounded-xl bg-neutral-900/60 h-11 placeholder:text-neutral-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-300">Requirement</label>
                  <Textarea
                    placeholder="Describe what you are looking for..."
                    className="min-h-[100px] resize-none text-white border-white/10 focus-visible:ring-neutral-400 rounded-xl bg-neutral-900/60 placeholder:text-neutral-500"
                  />
                </div>

                <Button className="w-full bg-white hover:bg-neutral-200 text-neutral-900 rounded-xl font-medium transition-colors h-11 mt-2">
                  Submit Inquiry
                </Button>
              </form>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
