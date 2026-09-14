import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, ExternalLink, X, Sparkles } from 'lucide-react';

const categories = ['All', 'Fashion', 'Beauty', 'Food', 'Retail', 'Product', 'Lifestyle', 'Collaboration'];

const sampleWork = [
  { gradient: 'from-[#FF5A5F] to-[#FF3D8D]', title: 'Fashion Showcase', category: 'Fashion', label: 'Brand Reel' },
  { gradient: 'from-[#8B5CF6] to-[#FF3D8D]', title: 'Product Launch', category: 'Product', label: 'Product Video' },
  { gradient: 'from-[#FF3D8D] to-[#FF5A5F]', title: 'Beauty Tutorial', category: 'Beauty', label: 'Tutorial Reel' },
  { gradient: 'from-[#8B5CF6] to-[#FF5A5F]', title: 'Food Story', category: 'Food', label: 'Food Reel' },
  { gradient: 'from-[#FF5A5F] to-[#8B5CF6]', title: 'Lifestyle Vlog', category: 'Lifestyle', label: 'Lifestyle Content' },
  { gradient: 'from-[#FF3D8D] to-[#8B5CF6]', title: 'Retail Campaign', category: 'Retail', label: 'Campaign Reel' },
  { gradient: 'from-[#8B5CF6] to-[#FF3D8D]', title: 'Brand Collab', category: 'Collaboration', label: 'Influencer Collab' },
  { gradient: 'from-[#FF5A5F] to-[#FF3D8D]', title: 'Aesthetic POV', category: 'Lifestyle', label: 'POV Reel' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof sampleWork[0] | null>(null);

  const filtered = activeCategory === 'All' 
    ? sampleWork 
    : sampleWork.filter(item => item.category === activeCategory);

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              DON'T TAKE OUR WORD<br />
              FOR IT. <span className="gradient-text">WATCH OUR WORK.</span>
            </h1>
            <p className="text-[#A9ACB8] text-lg max-w-2xl">
              A collection of our creative work — reels, campaigns, and content that helped brands grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white'
                    : 'bg-white/5 text-[#A9ACB8] hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#A9ACB8]">No work in this category yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-60`} />
                  <div className="absolute inset-0 bg-[#07090F]/20 group-hover:bg-[#07090F]/5 transition-colors duration-300" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={20} className="text-white ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-white/60 text-xs">{item.label}</p>
                  </div>

                  <div className="absolute top-3 right-3">
                    <Sparkles size={14} className="text-white/60" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 p-8 rounded-2xl bg-[#0B0E16] border border-white/5"
          >
            <p className="text-[#A9ACB8] text-sm">
              Portfolio is continuously updated. More work coming soon as we collaborate with brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${selectedItem.gradient} opacity-70`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Play size={40} className="text-white mx-auto mb-4" />
                <p className="text-white font-semibold">{selectedItem.title}</p>
                <p className="text-white/60 text-sm">{selectedItem.label}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
            >
              <X size={16} className="text-white" />
            </button>
            <div className="absolute bottom-4 left-4 right-4">
              <a
                href="https://instagram.com/ashwini_rathod_19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium"
              >
                <ExternalLink size={14} /> VIEW ON INSTAGRAM
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
