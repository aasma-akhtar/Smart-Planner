import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../context/ThemeContext";

export default function StarField() {
    const { isDark } = useTheme();
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) return null;

    return (
        <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden h-full w-full">
            <Particles
                id="tsparticles"
                particlesLoaded={async () => { }}
                options={{
                    fullScreen: { enable: false },
                    background: {
                        color: { value: "transparent" },
                    },
                    fpsLimit: 60,
                    particles: {
                        color: { value: isDark ? "#ffffff" : "#6366f1" },
                        links: {
                            color: isDark ? "#06b6d4" : "#8b5cf6",
                            distance: 150,
                            enable: isDark,
                            opacity: 0.1,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: { default: "bounce" },
                            random: true,
                            speed: isDark ? 0.6 : 0.3,
                            straight: false,
                        },
                        number: {
                            density: { enable: true, area: 1000 },
                            value: isDark ? 80 : 30,
                        },
                        opacity: {
                            value: isDark ? 0.6 : 0.15,
                            animation: {
                                enable: true,
                                speed: 0.5,
                                minimumValue: 0.1,
                                sync: false,
                            },
                        },
                        shape: { type: "circle" },
                        size: {
                            value: { min: 1, max: 2.5 },
                            animation: {
                                enable: true,
                                speed: 1,
                                minimumValue: 0.5,
                                sync: false,
                            },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
}
