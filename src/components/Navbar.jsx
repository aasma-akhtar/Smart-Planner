import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiSunrise } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

const navLinks = [
    { id: 'hero', label: 'Explore' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'timeline', label: 'Itineraries' },
    { id: 'map', label: 'Map' },
];

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled
                ? 'py-4 px-6 md:px-12 backdrop-blur-2xl bg-white/60 dark:bg-black/60 border-b border-slate-100 dark:border-white/10 shadow-2xl'
                : 'py-8 px-6 md:px-12 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Modern Brand Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="w-11 h-11 rounded-2xl bg-[#1297ea] flex items-center justify-center text-xl text-white transition-all duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-500/20">
                        <HiSparkles />
                    </div>
                    <div className="flex flex-col -gap-1">
                        <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
                            SMART
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.3em] text-[#1297ea] uppercase leading-none mt-1">
                            PLANNER
                        </span>
                    </div>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link, i) => (
                        <motion.button
                            key={link.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => scrollTo(link.id)}
                            className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-[#1297ea] transition-all cursor-pointer relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#1297ea] transition-all duration-300 group-hover:w-full" />
                        </motion.button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl text-[#1297ea] hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                    >
                        {isDark ? <FiSunrise /> : <FiMoon />}
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex btn-cosmic !py-2.5 !px-6 !text-xs !tracking-widest"
                    >
                        BOOK TRIP
                    </motion.button>

                    <button
                        className="md:hidden w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl text-slate-800"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-indigo-100/30 shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col p-10 gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollTo(link.id)}
                                    className="text-left text-lg font-black uppercase tracking-[0.2em] text-slate-700 hover:text-[#1297ea] transition-colors"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button className="btn-cosmic w-full !py-4">BOOK TRIP</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
