import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import TrackPageView from '../components/TrackPageView';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, Heart, Sparkles } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Users,
      title: 'Közösség',
      description: 'A crypto világ közösségének része vagyunk, és ezt a közösségi szellemet visszük bele minden termékünkbe.',
    },
    {
      icon: Award,
      title: 'Minőség',
      description: 'Prémium európai gyártás, tartós anyagok és nyomtatás - mert a stílus nem múlhat el.',
    },
    {
      icon: Heart,
      title: 'Szenvedély',
      description: 'Mi is crypto rajongók vagyunk, és ezt a szenvedélyt szeretnénk megosztani veletek.',
    },
    {
      icon: Sparkles,
      title: 'Kreativitás',
      description: 'Egyedi, humoros és trendi design-ok, amik garantáltan kitűnnek a tömegből.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <TrackPageView pageName="About" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            A{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931A] to-[#f5a623]">
              CryptoClub
            </span>
            {' '}történet
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Mi is befektetünk, de nem csak coinokba, hanem stílusba is. 
            Nálunk a póló nem csak egy ruha, hanem egy életérzés.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F7931A]/20 to-transparent rounded-3xl blur-2xl" />
              <img
                src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
                alt="Team"
                className="relative rounded-3xl w-full h-[400px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hogyan kezdődött?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              A CryptoTees ötlete egy baráti társaságból nőtt ki, ahol mindannyian crypto rajongók voltunk. 
              Szerettünk volna olyan ruhákat hordani, amik kifejezik ezt a szenvedélyt, de sehol nem találtunk 
              olyan minőséget és stílust, amit kerestünk.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Így született meg a CryptoTees - egy magyar márkát építettünk, ami ötvözi az európai minőséget 
              a crypto kultúra humorával és közösségi szellemével. Minden termékünk mögött ott van a 
              szenvedélyünk és a törekvésünk, hogy a lehető legjobb élményt nyújtsuk.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Ma már büszkék vagyunk arra, hogy több ezer elégedett vásárlónk van, és folyamatosan bővülő 
              kollekciónkkal szolgáljuk ki a crypto közösséget.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Értékeink
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 hover:border-[#F7931A]/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F7931A]/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#F7931A]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#F7931A]/10 to-[#1a1a1a] rounded-3xl p-8 md:p-12 mb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1000+', label: 'Elégedett vásárló' },
              { value: '50+', label: 'Egyedi design' },
              { value: '100%', label: 'EU gyártás' },
              { value: '4.9/5', label: 'Értékelés' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-[#F7931A] mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Készen állsz csatlakozni?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Fedezd fel kollekciónkat és találd meg a neked való pólót!
          </p>
          <Link
            to={createPageUrl('Products')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F7931A] to-[#f5a623] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F7931A]/25 transition-all"
          >
            Termékek megtekintése
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}