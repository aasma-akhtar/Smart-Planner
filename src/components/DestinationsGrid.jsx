import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiHeart, FiArrowRight, FiZap } from 'react-icons/fi';
import { WiDaySunny, WiSnow, WiCloudy, WiRain } from 'react-icons/wi';

const destinations = [
    {
        id: 1, name: 'Paris', country: 'France',
        description: 'The city of light and world-class architecture. Discover the Eiffel Tower and charming riverside cafés.',
        rating: 4.8, price: '$1,200', weather: 'sunny',
        tags: ['Culture', 'Romance'],
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=450&fit=crop',
        color: 'from-blue-500/10 to-indigo-500/10',
    },
    {
        id: 2, name: 'Tokyo', country: 'Japan',
        description: 'A fusion of ancient traditions and futuristic neon streets. World-class sushi and unforgettable energy.',
        rating: 4.9, price: '$1,500', weather: 'cloudy',
        tags: ['Tech', 'Food'],
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=450&fit=crop',
        color: 'from-sky-500/10 to-blue-500/10',
    },
    {
        id: 3, name: 'Bali', country: 'Indonesia',
        description: 'Tropical paradise with lush green rice terraces, sacred temples, and white-sand beaches.',
        rating: 4.7, price: '$800', weather: 'sunny',
        tags: ['Nature', 'Wellness'],
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=450&fit=crop',
        color: 'from-emerald-500/10 to-teal-500/10',
    },
    {
        id: 4, name: 'Dubai', country: 'UAE',
        description: 'Glistening skyscrapers and luxury at every turn. Experience desert safaris and cutting-edge design.',
        rating: 4.6, price: '$1,800', weather: 'sunny',
        tags: ['Luxury', 'Adventure'],
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=450&fit=crop',
        color: 'from-amber-500/10 to-orange-500/10',
    },
    {
        id: 5, name: 'New York', country: 'USA',
        description: 'The city that never sleeps. Broadway, Central Park, and world-class dining experiences.',
        rating: 4.7, price: '$1,400', weather: 'snow',
        tags: ['Urban', 'Nightlife'],
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=450&fit=crop',
        color: 'from-blue-500/10 to-indigo-500/10',
    },
    {
        id: 6, name: 'Santorini', country: 'Greece',
        description: 'Iconic white-washed buildings and breathtaking sunsets overlooking crystal blue waters.',
        rating: 4.9, price: '$1,100', weather: 'sunny',
        tags: ['Beach', 'Romance'],
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=450&fit=crop',
        color: 'from-purple-500/10 to-fuchsia-500/10',
    },
];

const weatherIcons = {
    sunny: <WiDaySunny className="text-amber-500 text-xl" />,
    snow: <WiSnow className="text-blue-400 text-xl" />,
    cloudy: <WiCloudy className="text-slate-400 text-xl" />,
    rain: <WiRain className="text-blue-500 text-xl" />,
};

function DestCard({ dest, index, onExplore }) {
    const [liked, setLiked] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card flex flex-col items-stretch h-full group !bg-white !border-white/50 hover:!border-[#1297ea]/30 shadow-2xl shadow-[#1297ea]/5"
        >
            <div className="relative h-72 overflow-hidden rounded-t-[28px]">
                <motion.img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-all duration-700"
                    whileHover={{ scale: 1.1 }}
                />

                {/* Visual Overlay Effect */}
                <div className={`absolute inset-0 bg-gradient-to-t ${dest.color} opacity-40 mix-blend-soft-light group-hover:opacity-60 transition-opacity`} />

                <div className="absolute top-5 right-5 z-20">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                        className="w-12 h-12 glass flex items-center justify-center !bg-white/80 !border-white backdrop-blur-md rounded-2xl shadow-xl"
                    >
                        <FiHeart className={`text-xl transition-all duration-300 ${liked ? 'fill-red-500 text-red-500 scale-125' : 'text-slate-400'}`} />
                    </motion.button>
                </div>

                <div className="absolute bottom-5 left-5 glass !bg-white/90 !border-white/10 px-5 py-2 flex items-center gap-2 rounded-xl text-[10px] font-black tracking-[0.2em] text-[#1297ea] backdrop-blur-xl shadow-lg">
                    {weatherIcons[dest.weather]} {dest.weather.toUpperCase()}
                </div>
            </div>

            <div className="p-10 flex-1 flex flex-col relative">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none group-hover:text-[#1297ea] transition-colors">{dest.name}</h3>
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1297ea]/10 text-[#1297ea] border border-[#1297ea]/10 text-xs font-black">
                        <FiStar className="fill-[#1297ea]" />
                        {dest.rating}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#1297ea]/60 mb-8 leading-none">
                    <FiMapPin className="text-[#1297ea]" />
                    {dest.country.toUpperCase()}
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-medium italic">
                    "{dest.description}"
                </p>

                <div className="flex flex-wrap gap-2.5 mb-10">
                    {dest.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-[0.1em] px-4 py-2 rounded-xl bg-slate-50 text-slate-500 border border-slate-100 transition-all hover:bg-white hover:border-[#1297ea]/30 hover:text-[#1297ea]">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-2">Starts at</span>
                        <span className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{dest.price}</span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onExplore?.(dest.name)}
                        className="btn-cosmic !py-4 !px-8 !text-[11px] !rounded-2xl"
                    >
                        EXPLORE <FiArrowRight className="text-xl" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default function DestinationsGrid({ onExplore }) {
    return (
        <section id="destinations" className="relative z-10 pt-32">
            {/* Colorful Glow Backgrounds */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1297ea]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />

            <div className="max-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 text-center md:text-left">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#1297ea]/5 text-[#1297ea] text-xs font-black tracking-[0.3em] uppercase mb-8 border border-[#1297ea]/10"
                        >
                            <FiZap /> TRENDING EXPLORATIONS
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none"
                        >
                            Curated <br /> <span className="gradient-text italic font-serif">Sanctuaries</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-400 text-xl max-w-sm md:text-right font-medium leading-relaxed"
                    >
                        Pristine locations selected for the curious mind and the adventurous heart.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {destinations.map((dest, i) => (
                        <DestCard key={dest.id} dest={dest} index={i} onExplore={onExplore} />
                    ))}
                </div>
            </div>
        </section>
    );
}
