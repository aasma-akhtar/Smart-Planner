import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiInstagram, FiMail, FiGlobe } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

const sitemap = [
    { label: 'Explore', links: ['Destinations', 'Itineraries', 'Pricing', 'Guides'] },
    { label: 'Company', links: ['About Us', 'Careers', 'Privacy Policy', 'Terms'] },
    { label: 'Support', links: ['Help Center', 'Safety Center', 'Contact', 'FAQ'] },
];

export default function Footer() {
    return (
        <footer className="relative pt-40 pb-20 overflow-hidden border-t border-slate-100 bg-white dark:bg-[#02040a] dark:border-white/5 transition-colors duration-500">
            {/* Ambient Background Glow (V. Subtle) */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1297ea]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-container relative z-10 font-medium">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12 mb-24">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 flex flex-col gap-10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-[#1297ea] flex items-center justify-center text-2xl text-white shadow-xl shadow-indigo-500/20">
                                <HiSparkles />
                            </div>
                            <div className="flex flex-col -gap-1">
                                <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    SMART
                                </span>
                                <span className="text-[10px] font-bold tracking-[0.3em] text-[#1297ea] uppercase leading-none mt-1">
                                    PLANNER
                                </span>
                            </div>
                        </div>

                        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
                            Redefining the art of discovery through high-fidelity intelligence and professional curation.
                        </p>

                        <div className="flex gap-6">
                            {[FiGithub, FiTwitter, FiInstagram, FiMail].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5, scale: 1.1, color: '#1297ea' }}
                                    className="text-2xl text-slate-300 dark:text-slate-600 transition-all duration-300"
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {sitemap.map((section) => (
                        <div key={section.label} className="flex flex-col gap-8">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">
                                {section.label}
                            </h4>
                            <ul className="flex flex-col gap-4">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <motion.a
                                            href="#"
                                            whileHover={{ x: 5, color: '#1297ea' }}
                                            className="text-sm text-slate-400 dark:text-slate-500 transition-all duration-300 block font-bold"
                                        >
                                            {link}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-50 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.25em]">
                            © 2026 SMART PLANNER PROTOCOL • ALL RIGHTS RESERVED
                        </p>
                    </div>

                    <div className="flex items-center gap-10">
                        <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer bg-white dark:bg-slate-900/50 border border-slate-50 dark:border-white/5 px-6 py-2 rounded-full shadow-sm">
                            <FiGlobe className="text-lg text-[#1297ea]" /> SYSTEM REGION: GLOBAL (USD)
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
