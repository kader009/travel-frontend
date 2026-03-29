import dynamic from 'next/dynamic';
import Hero from '@/src/home/Hero';

// Lazy load components that are below the fold
const Categories = dynamic(() => import('@/src/home/Categories'));
const HowItWorks = dynamic(() => import('@/src/home/HowItWorks'));
const PopularDestinations = dynamic(() => import('@/src/home/PopularDestinations'));
const TopRatedTravelers = dynamic(() => import('@/src/home/TopRatedTravelers'));
const Testimonials = dynamic(() => import('@/src/home/Testimonials'));
const CTA = dynamic(() => import('@/src/home/CTA'));

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <HowItWorks />
      <PopularDestinations />
      <TopRatedTravelers />
      <Testimonials />
      <CTA />
    </main>
  );
}
