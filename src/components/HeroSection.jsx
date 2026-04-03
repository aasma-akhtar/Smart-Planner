import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight } from 'react-icons/fi';

const popularDests = [
    { name: 'Paris', emoji: '🗼' },
    { name: 'Tokyo', emoji: '🏯' },
    { name: 'Bali', emoji: '🏝️' },
    { name: 'New York', emoji: '🗽' },
    { name: 'Dubai', emoji: '🌆' },
    { name: 'Santorini', emoji: '🏛️' },
];

export default function HeroSection({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) onSearch?.(query.trim());
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
            {/* Animated Ambient Glows (Lighter for Light Mode) */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#1297ea]/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.05, 0.15, 0.05],
                    x: [0, -50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-[#1297ea]/10 rounded-full blur-[140px] pointer-events-none"
            />

            <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
                {/* Modern Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="mb-10 flex justify-center"
                >
                    <div className="px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-white border border-slate-100 backdrop-blur-xl text-[#1297ea] flex items-center gap-3 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#1297ea] animate-pulse" />
                        AI-Powered Premium Explorer
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] mb-10 tracking-tight text-slate-900"
                >
                    Discovering <br />
                    <span className="gradient-text italic font-serif">your world</span> effortlessly
                </motion.h1>

                {/* Dynamic Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
                >
                    Expertly curated journeys and real-time insights for the modern nomad.
                </motion.p>

                {/* Advanced Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <div className="search-cosmic group hover:ring-8 hover:ring-[#1297ea]/5 transition-all duration-500">
                        <FiSearch className="ml-5 text-slate-400 group-focus-within:text-[#1297ea] text-2xl transition-all scale-110" />
                        <input
                            type="text"
                            placeholder="Search your next destination..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSearch}
                            className="btn-cosmic mr-2 shadow-lg"
                        >
                            Explore <FiArrowRight className="text-xl" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Staggered Quick Picks */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.8
                            }
                        }
                    }}
                    className="flex flex-wrap gap-3 justify-center items-center"
                >
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2 leading-none">Curated Locations:</span>
                    {popularDests.map((dest, i) => (
                        <motion.button
                            key={dest.name}
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: '#fff',
                                borderColor: 'rgba(18, 151, 234, 0.4)',
                                color: '#1297ea'
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setQuery(dest.name);
                                onSearch?.(dest.name);
                            }}
                            className="px-6 py-2.5 rounded-full text-xs font-black tracking-widest border border-slate-100 bg-white/50 text-slate-500 transition-all duration-300 shadow-sm"
                        >
                            {dest.emoji} {dest.name}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
