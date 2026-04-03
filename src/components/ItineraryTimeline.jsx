import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
    FiMapPin, FiClock, FiCamera, FiCoffee, FiSunrise,
    FiMoon, FiStar, FiChevronDown, FiChevronUp, FiTrash2, FiZap, FiNavigation
} from 'react-icons/fi';
import { MdRestaurant, MdDirectionsWalk, MdLocalActivity, MdFlight } from 'react-icons/md';

const iconMap = {
    flight: MdFlight,
    land: FiMapPin,
    photo: FiCamera,
    food: MdRestaurant,
    coffee: FiCoffee,
    walk: MdDirectionsWalk,
    activity: MdLocalActivity,
};

function TimelineItem({ item, index, onRemove }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = iconMap[item.icon] || FiMapPin;

    return (
        <Reorder.Item
            value={item}
            id={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative pb-16 last:pb-0 font-medium"
        >
            <div className="flex gap-10 md:gap-16">
                <div className="flex flex-col items-center">
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl border border-indigo-50 bg-white z-10 ${item.color || 'text-[#1297ea]'}`}
                    >
                        <Icon />
                    </motion.div>
                    <div className="w-[1px] h-full bg-gradient-to-b from-indigo-100 to-transparent absolute top-14" />
                </div>

                <motion.div className="flex-1 glass-card p-10 group !bg-white/70 !border-white hover:!border-indigo-300 shadow-2xl shadow-[#1297ea]/5">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full border leading-none ${item.period === 'morning' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                                        item.period === 'afternoon' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                            'bg-slate-50 text-slate-500 border-slate-200'
                                    }`}>
                                    {item.day} • {item.period}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                    <FiClock className="text-[#1297ea]/50" /> {item.time}
                                </span>
                            </div>
                            <h3 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#1297ea] transition-colors">{item.title}</h3>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.2, color: '#ef4444' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRemove(item.id)}
                            className="text-slate-300 transition-colors cursor-pointer"
                        >
                            <FiTrash2 />
                        </motion.button>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                        {item.description}
                    </p>

                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1297ea] hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                        {expanded ? 'Collapse Insights' : 'Explore Detailed Activities'}
                        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <FiChevronDown />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                                    {(item.activities || []).map((act, i) => (
                                        <motion.div
                                            key={act}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="px-5 py-4 rounded-2xl bg-white border border-indigo-50 text-[11px] font-black tracking-widest text-slate-700 flex items-center gap-4 hover:border-indigo-200 transition-all shadow-sm"
                                        >
                                            <FiZap className="text-[#1297ea] text-lg" />
                                            {act.toUpperCase()}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </Reorder.Item>
    );
}

export default function ItineraryTimeline({ items, title = "Curated", location = "Global", onReorder, onRemove }) {
    if (!items || items.length === 0) return null;

    return (
        <section id="timeline" className="relative pb-32">
            {/* Colorful Ambient Glows */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#1297ea]/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2" />

            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#1297ea]/10 text-[#1297ea] text-[10px] font-black tracking-[0.3em] uppercase mb-8 border border-[#1297ea]/20 shadow-sm"
                    >
                        <FiSunrise className="animate-pulse" /> LIVE SYNCED JOURNEY
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-tight"
                    >
                        {title} <span className="gradient-text italic font-serif">Itinerary</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-3">
                        <FiNavigation className="text-[#1297ea]" />
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">{location.toUpperCase()} PROTOCOL ACTIVE</span>
                    </div>
                </div>

                <div className="relative">
                    <Reorder.Group axis="y" values={items} onReorder={onReorder}>
                        {items.map((item, i) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                index={i}
                                onRemove={onRemove}
                            />
                        ))}
                    </Reorder.Group>
                </div>
            </div>
        </section>
    );
}
