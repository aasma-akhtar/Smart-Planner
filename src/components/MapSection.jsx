import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiNavigation, FiExternalLink, FiSearch, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import L from 'leaflet';
import { useTheme } from '../context/ThemeContext';

const createCustomIcon = (color) => L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px ${color}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
});

const locations = [
    { id: 1, name: "Eiffel Tower", city: "Paris", coords: [48.8584, 2.2945], color: "#1297ea", category: "Landmark" },
    { id: 2, name: "Senso-ji Temple", city: "Tokyo", coords: [35.7148, 139.7967], color: "#818cf8", category: "Temple" },
    { id: 3, name: "Uluwatu Temple", city: "Bali", coords: [-8.8291, 115.0849], color: "#06b6d4", category: "Nature" },
    { id: 4, name: "Burj Khalifa", city: "Dubai", coords: [25.1972, 55.2744], color: "#f59e0b", category: "Skyscraper" },
    { id: 5, name: "Central Park", city: "New York", coords: [40.7829, -73.9654], color: "#3b82f6", category: "Park" },
    { id: 6, name: "Oia Viewpoint", city: "Santorini", coords: [36.4618, 25.3753], color: "#a855f7", category: "Viewpoint" },
];

function FlyToLocation({ coords, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.flyTo(coords, zoom, { duration: 2, easeLinearity: 0.25 });
        }
    }, [coords, map, zoom]);
    return null;
}

export default function MapSection() {
    const { isDark } = useTheme();
    const [selectedLoc, setSelectedLoc] = useState(locations[0]);
    const [search, setSearch] = useState("");

    const filtered = locations.filter(loc =>
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        loc.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section id="map" className="relative pt-32">
            <div className="max-container">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter text-center"
                    >
                        Interactive <span className="gradient-text italic font-serif">Topography</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 glass overflow-hidden rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl h-[700px] !bg-white/40 dark:!bg-black/40">

                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-4 flex flex-col border-r border-slate-50 dark:border-white/5 bg-white/40 dark:bg-black/60 backdrop-blur-3xl overflow-hidden">
                        <div className="p-8 border-b border-slate-50 dark:border-white/5">
                            <div className="relative group">
                                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1297ea] text-lg transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Filter topography..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-[#1297ea]/5 border border-[#1297ea]/10 rounded-2xl py-4 pl-14 pr-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:bg-white dark:focus:bg-slate-900 transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                            {filtered.map((loc) => (
                                <motion.button
                                    key={loc.id}
                                    whileHover={{ x: 5 }}
                                    onClick={() => setSelectedLoc(loc)}
                                    className={`w-full text-left p-5 rounded-2xl flex items-center justify-between transition-all group ${selectedLoc.id === loc.id
                                        ? 'bg-white dark:bg-slate-900 border border-indigo-100 dark:border-white/10 shadow-lg'
                                        : 'border border-transparent hover:bg-white/50 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-500 font-black ${selectedLoc.id === loc.id
                                                ? 'bg-[#1297ea] text-white shadow-xl shadow-indigo-500/20'
                                                : 'bg-slate-100 text-slate-400 group-hover:text-[#1297ea]'
                                                }`}
                                        >
                                            <FiMapPin />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-800 dark:text-white tracking-tight leading-tight">{loc.name}</h4>
                                            <p className="text-[9px] uppercase font-black tracking-[0.2em] text-slate-400 mt-1.5">{loc.city}</p>
                                        </div>
                                    </div>
                                    <FiChevronRight className={`text-[#1297ea] transition-all ${selectedLoc.id === loc.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                                </motion.button>
                            ))}
                        </div>

                        {/* Bottom Detail Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedLoc.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="p-8 mt-auto border-t border-slate-50 dark:border-white/5 bg-[#1297ea]/5"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#1297ea] px-3 py-1 rounded-full bg-[#1297ea]/10 border border-[#1297ea]/20">
                                        {selectedLoc.category}
                                    </span>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest">
                                        <FiNavigation className="text-[#1297ea]/50" /> {selectedLoc.coords[0].toFixed(2)}N, {selectedLoc.coords[1].toFixed(2)}E
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight uppercase">{selectedLoc.name}</h3>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full btn-cosmic !py-4 rounded-xl flex items-center justify-center gap-2 !text-[10px] !font-black !tracking-[0.25em]"
                                >
                                    OPEN CONCIERGE <FiExternalLink className="text-lg" />
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Advanced Map Container */}
                    <div className="lg:col-span-8 relative z-0">
                        <MapContainer
                            center={selectedLoc.coords}
                            zoom={13}
                            className="w-full h-full"
                            zoomControl={false}
                        >
                            <TileLayer
                                url={isDark
                                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                }
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                            />
                            {locations.map((loc) => (
                                <Marker
                                    key={loc.id}
                                    position={loc.coords}
                                    icon={createCustomIcon(loc.color)}
                                    eventHandlers={{ click: () => setSelectedLoc(loc) }}
                                >
                                    <Popup className="premium-popup">
                                        <div className="p-2">
                                            <p className="font-black text-[10px] uppercase tracking-widest text-[#1297ea] mb-1">{loc.city}</p>
                                            <p className="font-bold text-sm text-slate-900 dark:text-white">{loc.name}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                            <FlyToLocation coords={selectedLoc.coords} zoom={13} />
                        </MapContainer>

                        <div className="absolute top-8 right-8 z-20 flex flex-col gap-3">
                            <button className="w-12 h-12 glass flex items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 shadow-xl !rounded-xl border-white/50 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <FiMaximize2 />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
