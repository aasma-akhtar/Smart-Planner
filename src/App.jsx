import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GalaxyLoader from './components/GalaxyLoader';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load below-the-fold component
const DestinationsGrid = lazy(() => import('./components/DestinationsGrid'));
const ItineraryTimeline = lazy(() => import('./components/ItineraryTimeline'));
const MapSection = lazy(() => import('./components/MapSection'));
const WeatherSection = lazy(() => import('./components/WeatherSection'));
const Footer = lazy(() => import('./components/Footer'));

const defaultItinerary = [
  {
    id: '1', day: 'Day 1', title: 'Elite Arrival Protocol', time: '09:00 AM', period: 'morning',
    icon: 'flight', color: 'text-[#1297ea]',
    description: 'Synchronized airport transfer directly to your sanctuary. Full concierge bridge initialization and baggage handling with priority check-in.',
    activities: ['Priority arrival', 'Welcome briefing', 'State check', 'Suite orientation', 'Refreshment service'],
  },
  {
    id: '2', day: 'Day 1', title: 'Urban Topology Scan', time: '02:00 PM', period: 'afternoon',
    icon: 'walk', color: 'text-[#1297ea]',
    description: 'A guided high-fidelity walk through the city core. Map the essential landmarks and historical intersections while avoiding high-density zones.',
    activities: ['Landmark scan', 'Local interaction', 'Boutique exploration', 'Coffee break at a hidden gem'],
  },
  {
    id: '3', day: 'Day 1', title: 'Sunset Gastronomy', time: '07:30 PM', period: 'evening',
    icon: 'food', color: 'text-fuchsia-500',
    description: 'First culinary immersion at a rooftop venue overlooking the illuminated skyline. Traditional fusion menu.',
    activities: ['Prefixed tasting', 'Wine pairing', 'Chef interaction'],
  }
];

const activityTemplates = {
  Paris: [
    { id: 'p1', day: 'Day 1', title: 'Seine Arrival Protocol', time: '10:00 AM', period: 'morning', icon: 'flight', color: 'text-[#1297ea]', description: 'Begin your Parisian journey with a private boat transfer along the Seine. Enjoy champagne and pastries as you pass by the Louvre and Notre Dame.', activities: ['Private boat cruise', 'Pastry tasting', 'Champagne welcome'] },
    { id: 'p2', day: 'Day 1', title: 'Eiffel Viewpoint Scan', time: '03:00 PM', period: 'afternoon', icon: 'photo', color: 'text-indigo-400', description: 'Capture the iconic skyline from a curated vantage point at Trocadéro. Avoid crowds with our pre-mapped secret corners.', activities: ['Trocadéro vantage point', 'Secret spot reveal', 'Professional photography tips'] },
    { id: 'p3', day: 'Day 2', title: 'Louvre Expedition Alpha', time: '09:00 AM', period: 'morning', icon: 'land', color: 'text-amber-500', description: 'VIP early-access to the world\'s most prestigious art sanctuary. Focus on the Italian Renaissance wing before peak flux.', activities: ['Fast-track entry', 'Private Curator', 'Masterpiece study'] },
    { id: 'p4', day: 'Day 2', title: 'Montmartre Artistic Pulse', time: '04:00 PM', period: 'afternoon', icon: 'walk', color: 'text-fuchsia-500', description: 'An immersive walk through the bohemian heart of Paris. Visit hidden artist ateliers used by Picasso and Dalí.', activities: ['Atelier visit', 'Portrait sketching', 'Sacre-Coeur sunset'] },
    { id: 'p5', day: 'Day 3', title: 'Versailles Sovereignty Sync', time: '10:00 AM', period: 'morning', icon: 'activity', color: 'text-blue-500', description: 'Deep dive into the Hall of Mirrors and the Queen’s private estate with an imperial guide.', activities: ['Palace tour', 'Garden exploration', 'Private carriage ride'] }
  ],
  Tokyo: [
    { id: 't1', day: 'Day 1', title: 'Shibuya Pulse Scan', time: '06:00 PM', period: 'evening', icon: 'walk', color: 'text-cyan-400', description: 'Experience the electric energy of the world\'s busiest intersection. Follow the neon nodes through Shibuya\'s multi-layered shopping vertical.', activities: ['Intersection crossing', 'Magnet building deck', 'D-Gen entertainment hub'] },
    { id: 't2', day: 'Day 2', title: 'Tsukiji Flavor Sync', time: '07:00 AM', period: 'morning', icon: 'food', color: 'text-[#1297ea]', description: 'High-frequency sushi breakfast and market exploration. Witness the master sushi chefs at work in the outer market.', activities: ['Sushi workshop', 'Market walkthrough', 'Tea ceremony'] },
    { id: 't3', day: 'Day 2', title: 'Akihabara Tech Integration', time: '01:00 PM', period: 'afternoon', icon: 'activity', color: 'text-fuchsia-500', description: 'Deep scan of the electric town. Discover rare retro tech, high-end robotics, and niche anime subcultures.', activities: ['Retro tech hunt', 'Robotics cafe', 'Arcade competition'] },
    { id: 't4', day: 'Day 3', title: 'TeamLab Sensory Immersive', time: '11:00 AM', period: 'morning', icon: 'activity', color: 'text-indigo-400', description: 'Immerse into a digital art universe beyond imagination. Data-driven lighting and physical interaction modules.', activities: ['Immersive borderless tour', 'Planets exploration', 'Interactive light arrays'] },
    { id: 't5', day: 'Day 3', title: 'Shinjuku Golden Gai Loop', time: '08:00 PM', period: 'evening', icon: 'coffee', color: 'text-amber-500', description: 'End the journey in the legendary narrow alleys of Golden Gai. Personalized beverage sampling at curated micro-venues.', activities: ['Alleyway exploration', 'Rare sake tasting', 'Local storyteller meeting'] }
  ],
  Bali: [
    { id: 'b1', day: 'Day 1', title: 'Ubud Canopy Arrival', time: '11:00 AM', period: 'morning', icon: 'flight', color: 'text-emerald-500', description: 'Settle into the lush emerald embrace of the tropical highlands. Synchronize your internal clock with the rhythm of the jungle.', activities: ['Jungle suite check-in', 'Yoga flow session', 'Organic lunch'] },
    { id: 'b2', day: 'Day 1', title: 'Sacred Water Cleansing', time: '04:00 PM', period: 'afternoon', icon: 'land', color: 'text-blue-400', description: 'A spiritual synchronization at a hidden forest temple. Experience the Tirta Empul ritual from a local priest\'s perspective.', activities: ['Temple offering', 'Ritual bathing', 'Meditation session'] },
    { id: 'b3', day: 'Day 2', title: 'Rice Field Topology Walk', time: '08:00 AM', period: 'morning', icon: 'walk', color: 'text-[#1297ea]', description: 'Trek through the Tegalalang terraces. Learn about the ancient Subak irrigation intelligence used for centuries.', activities: ['Terrace trek', 'Farmer interaction', 'Local coffee craft'] }
  ],
  Dubai: [
    { id: 'd1', day: 'Day 1', title: 'Burj Skyline Interface', time: '05:00 PM', period: 'afternoon', icon: 'photo', color: 'text-[#1297ea]', description: 'Ascend to the highest observer deck in the world. High-speed vertical transit to the apex of engineering.', activities: ['At The Top access', 'Dubai Mall fountain show', 'Level 148 sunset'] },
    { id: 'd2', day: 'Day 1', title: 'Sheikh Zayed Mosque Loop', time: '09:00 PM', period: 'evening', icon: 'land', color: 'text-white', description: 'A serene midnight visit to the architectural marvel in Abu Dhabi. Witness the lunar phase lighting system.', activities: ['Night architecture tour', 'Cultural walkthrough', 'Silent reflection'] },
    { id: 'd3', day: 'Day 2', title: 'Desert Protocol Alpha', time: '06:00 AM', period: 'morning', icon: 'activity', color: 'text-amber-600', description: 'Sunrise sand dune navigation and falconry workshop. Experience the heritage of the Bedouins with a modern tech twist.', activities: ['Sand bashing', 'Falcon interaction', 'Traditional breakfast'] }
  ]
};

const defaultActivities = [
  'Local Exploration', 'Gastronomy Scan', 'Architectural Survey', 'Cultural Exchange', 'Atmospheric Sync',
  'Resource Allocation', 'Digital detox', 'Interactive Workshop', 'Historical Research', 'Sanctuary Visit'
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState(defaultItinerary);
  const [currentLocation, setCurrentLocation] = useState('Global');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // Reduced loading time slightly for better UX
    return () => clearTimeout(timer);
  }, []);

  const generateItinerary = (location) => {
    const name = location.split(',')[0].trim();
    const template = activityTemplates[name];

    if (template) {
      return template.map(item => ({
        ...item,
        activities: item.activities || [defaultActivities[Math.floor(Math.random() * defaultActivities.length)], 'Resource Allocation']
      }));
    }

    // Generate a detailed generic 3-day itinerary if no template
    return [
      { id: '1', day: 'Day 1', title: `Arrival: ${name} Protocol`, time: '11:00 AM', period: 'morning', icon: 'flight', color: 'text-[#1297ea]', description: `High-priority transit to your new center of operations in ${name}.`, activities: ['Priority arrival', 'Baggage sync', 'Local briefing'] },
      { id: '2', day: 'Day 1', title: 'Exploration Alpha', time: '03:00 PM', period: 'afternoon', icon: 'walk', color: 'text-indigo-500', description: `Inaugural walk through ${name}\'s most vibrant district.`, activities: ['Landmark scan', 'Boutique exploration', 'Street food trial'] },
      { id: '3', day: 'Day 2', title: 'Cultural Integration', time: '09:30 AM', period: 'morning', icon: 'land', color: 'text-fuchsia-500', description: 'Deep synchronization with the local identity through heritage sites.', activities: ['Museum visit', 'Gallery walk', 'Historical briefing'] },
      { id: '4', day: 'Day 2', title: 'Innovation Workshop', time: '02:00 PM', period: 'afternoon', icon: 'activity', color: 'text-cyan-500', description: 'A hands-on session with local artisans or technology experts.', activities: ['Maker space', 'Skill building', 'Networking'] },
      { id: '5', day: 'Day 3', title: 'Final Synchronization', time: '10:00 AM', period: 'morning', icon: 'activity', color: 'text-amber-500', description: 'Wrapping up operations and capturing final data points from the area.', activities: ['Final shopping', 'Scenic breakfast', 'Departure log'] }
    ];
  };

  const handleUpdateLocation = (location) => {
    setCurrentLocation(location);
    const newItinerary = generateItinerary(location);
    setItinerary(newItinerary);

    // Scroll to timeline
    setTimeout(() => {
      const el = document.getElementById('timeline');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleSearch = (query) => {
    handleUpdateLocation(query);
  };

  const handleRemoveItem = (id) => {
    setItinerary(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <GalaxyLoader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col min-h-screen relative"
          >
            <StarField />

            <Navbar />

            <main className="flex-1 w-full relative z-10 flex flex-col gap-24 md:gap-36 pb-32">
              <HeroSection onSearch={handleSearch} />

              <Suspense fallback={
                <div className="py-20 flex justify-center">
                  <div className="w-10 h-10 border-4 border-[#1297ea]/20 border-t-[#1297ea] rounded-full animate-spin" />
                </div>
              }>
                <div className="flex flex-col gap-10">
                  <DestinationsGrid onExplore={handleUpdateLocation} />

                  <ItineraryTimeline
                    items={itinerary}
                    location={currentLocation}
                    title={currentLocation === 'Global' ? 'Global' : `${currentLocation}`}
                    onReorder={setItinerary}
                    onRemove={handleRemoveItem}
                  />

                  <MapSection />
                  <WeatherSection />
                </div>
              </Suspense>
            </main>

            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
