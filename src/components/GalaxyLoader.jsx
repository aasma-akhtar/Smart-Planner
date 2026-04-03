import { motion } from 'framer-motion';

export default function GalaxyLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f8fafc] overflow-hidden">
            <div className="relative flex items-center justify-center">
                {/* Orbital Rings */}
                <motion.div
                    className="w-32 h-32 border border-[#1297ea]/10 rounded-full absolute"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="w-48 h-48 border border-[#1297ea]/10 rounded-full absolute"
                    animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />

                {/* Primary Pulsar */}
                <motion.div
                    className="relative w-20 h-20 rounded-3xl bg-[#1297ea] flex items-center justify-center shadow-[0_0_50px_rgba(18,151,234,0.3)]"
                    animate={{
                        rotate: [0, 90, 180, 270, 360],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                </motion.div>

                {/* Satellite Points */}
                <motion.div
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-2 h-2 rounded-full bg-[#1297ea] absolute -top-16 shadow-lg" />
                </motion.div>
                <motion.div
                    className="absolute"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-2 h-2 rounded-full bg-indigo-400 absolute -bottom-24 -right-10 shadow-lg" />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-20 text-center"
            >
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-black text-slate-900 tracking-[0.3em] uppercase leading-none">
                        SMART
                    </h2>
                    <span className="text-[10px] font-black tracking-[0.6em] text-[#1297ea] uppercase mt-2">
                        PLANNER
                    </span>
                </div>
                <div className="flex items-center justify-center gap-3 mt-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-pulse" />
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400">
                        Synchronizing Network
                    </p>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-pulse" />
                </div>
            </motion.div>
        </div>
    );
}
