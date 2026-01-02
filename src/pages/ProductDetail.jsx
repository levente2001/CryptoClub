import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import TrackPageView from '../components/TrackPageView';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Minus, Plus, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '../components/products/ProductCard';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => base44.entities.Product.filter({ id: productId }),
    select: (data) => data[0],
    enabled: !!productId,
  });

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['related-products', product?.category],
    queryFn: () => base44.entities.Product.filter({ 
      is_active: true, 
      category: product?.category 
    }, '-created_date', 4),
    enabled: !!product?.category,
  });

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cryptoCart') || '[]');
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === selectedSize);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        size: selectedSize,
        quantity: quantity,
      });
    }
    
    localStorage.setItem('cryptoCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-3xl bg-[#1a1a1a]" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 bg-[#1a1a1a]" />
              <Skeleton className="h-8 w-1/3 bg-[#1a1a1a]" />
              <Skeleton className="h-32 w-full bg-[#1a1a1a]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Termék nem található</h2>
          <Link to={createPageUrl('Products')} className="text-[#F7931A] hover:underline">
            Vissza a termékekhez
          </Link>
        </div>
      </div>
    );
  }

  const filteredRelated = relatedProducts.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <TrackPageView pageName={`ProductDetail - ${product?.name || 'Unknown'}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to={createPageUrl('Products')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Vissza a termékekhez
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5">
              {product.badge && (
                <div className={`absolute top-6 left-6 z-10 px-4 py-2 rounded-full text-sm font-bold text-white uppercase ${
                  product.badge === 'new' ? 'bg-emerald-500' :
                  product.badge === 'sale' ? 'bg-red-500' : 'bg-purple-500'
                }`}>
                  {product.badge === 'new' && 'Új'}
                  {product.badge === 'sale' && 'Akció'}
                  {product.badge === 'limited' && 'Limitált'}
                </div>
              )}
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="text-sm text-[#F7931A] font-medium mb-2 uppercase tracking-wide">
              {product.category?.replace('_', ' ')}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-[#F7931A]">
                {product.price?.toLocaleString('hu-HU')} Ft
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  {product.original_price?.toLocaleString('hu-HU')} Ft
                </span>
              )}
            </div>

            <p className="text-gray-400 leading-relaxed mb-8">
              {product.description || 'Prémium minőségű pamut póló, kényelmes szabással. Tartós, nem fakul a nyomtatás. Tökéletes választás minden crypto rajongónak!'}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-3">Méret</label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-[#F7931A] text-black'
                        : 'bg-[#1a1a1a] text-gray-400 border border-white/10 hover:border-[#F7931A]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-3">Mennyiség</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#1a1a1a] rounded-xl border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.stock > 0 && (
                  <span className="text-sm text-gray-500">
                    {product.stock} db készleten
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={addToCart}
              className={`w-full h-14 text-lg font-semibold rounded-xl transition-all ${
                addedToCart
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-gradient-to-r from-[#F7931A] to-[#f5a623] hover:shadow-lg hover:shadow-[#F7931A]/25'
              } text-black`}
            >
              <AnimatePresence mode="wait">
                {addedToCart ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Hozzáadva!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Kosárba
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, text: 'Gyors szállítás' },
                { icon: Shield, text: 'Biztonságos' },
                { icon: RotateCcw, text: 'Visszaküldés' },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center mb-2">
                    <feature.icon className="w-5 h-5 text-[#F7931A]" />
                  </div>
                  <span className="text-xs text-gray-400">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {filteredRelated.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl font-bold mb-8">Kapcsolódó termékek</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRelated.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}