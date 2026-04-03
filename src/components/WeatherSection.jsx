import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiSun, FiCloud, FiCloudSnow, FiCloudRain, FiWind,
    FiDroplet, FiZap, FiNavigation, FiActivity
} from 'react-icons/fi';
import axios from 'axios';

const cities = [
    { id: 1, name: 'Paris', country: 'FR', category: 'Culture', lat: 48.8584, lon: 2.2945 },
    { id: 2, name: 'Tokyo', country: 'JP', category: 'Tech', lat: 35.7148, lon: 139.7967 },
    { id: 3, name: 'Bali', country: 'ID', category: 'Nature', lat: -8.8291, lon: 115.0849 },
    { id: 4, name: 'New York', country: 'US', category: 'Urban', lat: 40.7829, lon: -73.9654 },
    { id: 5, name: 'Dubai', country: 'AE', category: 'Luxury', lat: 25.1972, lon: 55.2744 },
    { id: 6, name: 'Santorini', country: 'GR', category: 'Island', lat: 36.4618, lon: 25.3753 },
];

export default function WeatherSection() {
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        setLoading(true);
        setError('');
        try {
            const results = {};
            await Promise.all(cities.map(async (city) => {
                const res = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&hourly=relativehumidity_2m,windspeed_10m`
                );
                results[city.id] = res.data.current_weather;
                results[city.id].humidity = res.data.hourly?.relativehumidity_2m?.[0] || '--';
            }));
            setWeatherData(results);
        } catch (err) {
            console.error(err);
            setError('Synchronization failed. Please check your network.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    const getWeatherIcon = (code) => {
        if (code === 0) return <FiSun className="text-amber-500" />;
        if (code >= 1 && code <= 3) return <FiCloud className="text-slate-400" />;
        if (code >= 45 && code <= 48) return <FiCloud className="text-slate-500" />;
        if (code >= 51 && code <= 67) return <FiCloudRain className="text-blue-500" />;
        if (code >= 71 && code <= 77) return <FiCloudSnow className="text-blue-300" />;
        if (code >= 80 && code <= 99) return <FiCloudRain className="text-[#1297ea]" />;
        return <FiSun className="text-amber-500" />;
    };

    return (
        <section id="weather" className="relative pt-32">
            <div className="max-container">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#1297ea] text-[10px] font-black tracking-widest uppercase mb-8 border border-slate-100 shadow-sm"
                    >
                        <FiZap className="animate-pulse" /> LIVE CLIMATE SCANNER
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8"
                    >
                        Dynamic <span className="gradient-text">Atmosphere</span> Feed
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Real-time meteorological intelligence synchronized across all global sanctuaries.
                    </motion.p>
                </div>

                <div className="space-y-16">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-8">
                            <motion.div
                                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-20 h-20 border-[6px] border-[#1297ea]/10 border-t-[#1297ea] rounded-full"
                            />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1297ea] animate-pulse">Syncing Global Data...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12">
                            {cities.map((city, i) => {
                                const data = weatherData[city.id];
                                if (!data) return null;
                                return (
                                    <motion.div
                                        key={city.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                        className="glass-card p-12 flex flex-col gap-10 group relative !bg-white/50 !border-slate-100"
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">{city.name}</h3>
                                                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#1297ea] mt-3 leading-none">{city.category}</p>
                                            </div>
                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: 10 }}
                                                className="text-6xl drop-shadow-xl transition-all duration-700"
                                            >
                                                {getWeatherIcon(data.weathercode)}
                                            </motion.div>
                                        </div>

                                        <div className="flex items-baseline gap-2 relative z-10">
                                            <span className="text-7xl font-black tracking-tighter text-slate-900">{Math.round(data.temperature)}°</span>
                                            <span className="text-lg font-black text-slate-400 tracking-[0.2em]">CELSIUS</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-10 border-t border-slate-50 relative z-10">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-3">
                                                    <FiDroplet className="text-[#1297ea] text-lg" />
                                                    <span className="text-sm font-black text-slate-800">{data.humidity}%</span>
                                                </div>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-7">Humidity</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-3">
                                                    <FiWind className="text-slate-400 text-lg" />
                                                    <span className="text-sm font-black text-slate-800">{data.windspeed} km/h</span>
                                                </div>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-7">Wind Feed</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-6 pt-12 pb-24 font-bold">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 bg-white px-8 py-3 rounded-full border border-slate-50 shadow-sm">
                            <FiNavigation className="text-[#1297ea]" /> SOURCE: OPEN-METEO PROTOCOL (UNRESTRICTED)
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
