import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cryptoCart') || '[]');
    setCart(savedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 15000 ? 0 : 1490;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      shipping_address: formData.address,
      notes: formData.notes,
      items: cart.map(item => ({
        product_id: item.id,
        product_name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: total + shipping,
      status: 'pending',
    };

    await base44.entities.Order.create(orderData);
    
    localStorage.setItem('cryptoCart', JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));
    setIsComplete(true);
    setIsSubmitting(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Rendelés leadva!</h1>
          <p className="text-gray-400 mb-8">
            Köszönjük a rendelésed! Hamarosan küldünk egy visszaigazoló e-mailt a megadott címre.
          </p>
          <Link
            to={createPageUrl('Home')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F7931A] to-[#f5a623] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F7931A]/25 transition-all"
          >
            Vissza a főoldalra
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">A kosarad üres</h2>
          <Link to={createPageUrl('Products')} className="text-[#F7931A] hover:underline">
            Vissza a termékekhez
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={createPageUrl('Cart')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Vissza a kosárhoz
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          Pénztár
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
              <h2 className="text-xl font-bold mb-6">Személyes adatok</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Teljes név *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 bg-[#252525] border-white/10 h-12 rounded-xl"
                    placeholder="Kovács János"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">E-mail cím *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 bg-[#252525] border-white/10 h-12 rounded-xl"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="phone" className="text-gray-300">Telefonszám *</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 bg-[#252525] border-white/10 h-12 rounded-xl"
                    placeholder="+36 30 123 4567"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
              <h2 className="text-xl font-bold mb-6">Szállítási cím</h2>
              <div>
                <Label htmlFor="address" className="text-gray-300">Teljes cím *</Label>
                <Textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-2 bg-[#252525] border-white/10 rounded-xl"
                  placeholder="1234 Budapest, Példa utca 12."
                  rows={3}
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="notes" className="text-gray-300">Megjegyzés (opcionális)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-2 bg-[#252525] border-white/10 rounded-xl"
                  placeholder="Pl.: csengőnél hívjon"
                  rows={2}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-gradient-to-r from-[#F7931A] to-[#f5a623] text-black font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-[#F7931A]/25 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Feldolgozás...
                </>
              ) : (
                'Rendelés leadása'
              )}
            </Button>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 sticky top-28">
              <h2 className="text-xl font-bold mb-6">Rendelés összesítő</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#252525]">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400">Méret: {item.size} | Db: {item.quantity}</p>
                      <p className="text-sm font-semibold text-[#F7931A] mt-1">
                        {(item.price * item.quantity).toLocaleString('hu-HU')} Ft
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Részösszeg</span>
                  <span>{total.toLocaleString('hu-HU')} Ft</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Szállítás</span>
                  <span>{shipping === 0 ? 'Ingyenes' : `${shipping.toLocaleString('hu-HU')} Ft`}</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Összesen</span>
                    <span className="text-[#F7931A]">
                      {(total + shipping).toLocaleString('hu-HU')} Ft
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}