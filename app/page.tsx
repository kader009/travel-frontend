import Hero from '@/src/home/Hero';
import Categories from '@/src/home/Categories';
import HowItWorks from '@/src/home/HowItWorks';
import PopularDestinations from '@/src/home/PopularDestinations';
import TopRatedTravelers from '@/src/home/TopRatedTravelers';
import Testimonials from '@/src/home/Testimonials';
import CTA from '@/src/home/CTA';

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
