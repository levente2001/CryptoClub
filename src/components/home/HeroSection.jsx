import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const features = [
    { icon: Truck, text: 'Gyors szállítás' },
    { icon: Shield, text: 'Biztonságos fizetés' },
    { icon: RotateCcw, text: 'Könnyű visszaküldés' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#F7931A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F7931A]/3 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F7931A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7931A]/10 border border-[#F7931A]/30 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7931A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7931A]"></span>
                </span>
                <span className="text-sm font-medium text-[#F7931A]">Új kollekció érkezett! 🔥</span>
              </div>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Nyisd ki a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931A] to-[#f5a623] animate-pulse">
                CRYPTO
              </span>
              {' '}világ{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931A] to-[#f5a623] animate-pulse">
                gardróbját
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-400 leading-relaxed max-w-lg">
              És viselj olyan stílust, ahonnan tudják, a <span className="text-[#F7931A] font-semibold"> Crypto Club</span> közösség tagja vagy.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={createPageUrl('Products')}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F7931A] to-[#f5a623] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F7931A]/25 transition-all transform hover:-translate-y-1"
              >
                Termékek
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={createPageUrl('About')}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:border-[#F7931A] hover:text-[#F7931A] transition-all"
              >
                Rólunk
              </Link>
            </div>

            {/* Features */}
            <div className="mt-16 flex flex-wrap gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 text-gray-400"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[#F7931A]" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F7931A]/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 border border-white/5">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#F7931A]/20 to-[#252525] flex items-center justify-center overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop"
                    alt="Crypto Tees"
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Bitcoin Icons */}
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-8 right-8 w-12 h-12 bg-[#F7931A] rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <span className="text-2xl">₿</span>
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [0, 15, 0],
                      rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-12 left-8 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <span className="text-xl">Ξ</span>
                  </motion.div>
                </div>
                
                {/* Floating Badge with Icon */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-[#F7931A] to-[#f5a623] text-black px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2"
                >
                  <span className="text-2xl">💎</span>
                  <span>Diamond Hands</span>
                </motion.div>

                {/* Price Tag with Animation */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#1a1a1a] to-[#252525] border border-[#F7931A]/30 px-6 py-3 rounded-2xl backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">🚀</span>
                    <div>
                      <span className="text-gray-400 text-xs block">Már csak</span>
                      <span className="text-2xl font-bold text-[#F7931A]">5 890 Ft</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}