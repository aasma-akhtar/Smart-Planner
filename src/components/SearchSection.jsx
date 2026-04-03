import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCalendar, FiUsers, FiMapPin } from 'react-icons/fi';

const popularSearches = ['Paris, France', 'Tokyo, Japan', 'Bali, Indonesia', 'Dubai, UAE', 'New York, USA', 'Rome, Italy'];

export default function SearchSection({ onSearch }) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [travelers, setTravelers] = useState(1);

    const handleSearch = () => {
        if (query.trim()) {
            onSearch?.(query.trim());
        }
    };

    return (
        <section id="search" className="relative py-24 md:py-32 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Where will the <span className="gradient-text">cosmos</span> take you?
                    </h2>
                    <p className="text-lg opacity-50">Search any destination across the universe of travel</p>
                </motion.div>

                {/* Main Search */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    animate={isFocused ? { y: -8 } : { y: 0 }}
                >
                    <div className={`search-cosmic ${isFocused ? 'animate-pulse-glow' : ''}`}>
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--color-neon-cyan)] text-xl" />
                        <input
                            type="text"
                            placeholder="Search destinations, cities, or countries..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            id="destination-search"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 btn-cosmic py-2.5 px-6 text-sm cursor-pointer"
                        >
                            Explore
                        </motion.button>
                    </div>
                </motion.div>

                {/* Extended Search Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    <div className="glass-card p-4 flex items-center gap-3">
                        <FiCalendar className="text-[var(--color-neon-cyan)] text-lg shrink-0" />
                        <div className="flex-1">
                            <label className="text-xs opacity-40 block mb-1">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-transparent w-full text-sm outline-none"
                                id="start-date"
                            />
                        </div>
                    </div>

                    <div className="glass-card p-4 flex items-center gap-3">
                        <FiCalendar className="text-[var(--color-neon-purple)] text-lg shrink-0" />
                        <div className="flex-1">
                            <label className="text-xs opacity-40 block mb-1">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-transparent w-full text-sm outline-none"
                                id="end-date"
                            />
                        </div>
                    </div>

                    <div className="glass-card p-4 flex items-center gap-3">
                        <FiUsers className="text-[var(--color-neon-pink)] text-lg shrink-0" />
                        <div className="flex-1">
                            <label className="text-xs opacity-40 block mb-1">Travelers</label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                                    className="w-7 h-7 rounded-full glass flex items-center justify-center text-sm cursor-pointer hover:bg-white/10"
                                >
                                    −
                                </button>
                                <span className="text-sm font-semibold w-4 text-center">{travelers}</span>
                                <button
                                    onClick={() => setTravelers(Math.min(20, travelers + 1))}
                                    className="w-7 h-7 rounded-full glass flex items-center justify-center text-sm cursor-pointer hover:bg-white/10"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Popular Searches */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-8 flex flex-wrap gap-2 justify-center"
                >
                    <span className="text-xs opacity-40 mr-2 self-center">Popular:</span>
                    {popularSearches.map((item, i) => (
                        <motion.button
                            key={item}
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setQuery(item);
                                onSearch?.(item);
                            }}
                            className="glass px-4 py-1.5 text-xs rounded-full cursor-pointer flex items-center gap-1.5 hover:border-[var(--color-neon-cyan)] transition-colors"
                        >
                            <FiMapPin className="text-[var(--color-neon-cyan)]" />
                            {item}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
