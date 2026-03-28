import Image from 'next/image';
import {
  Globe,
  Heart,
  Leaf,
  Mountain,
  Rocket,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Container from '@/src/components/ui/Container';

const AboutPage = () => {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative px-6 py-12 lg:py-24 overflow-hidden">
        <Container>
          <div className="flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              <Globe className="w-4 h-4" /> Our World Journey
            </div>
            <h1 className="text-4xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white max-w-4xl">
              Connecting the World, One Journey at a{' '}
              <span className="text-primary-text">Time</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Your global community for finding the perfect travel companion and
              creating lifelong memories together. We believe travel is better
              shared.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button className="rounded-full bg-primary px-10 py-4 text-base font-bold text-background-dark hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                Start Your Adventure
              </button>
            </div>
          </div>
        </Container>
        {/* Abstract Hero Visuals */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-background-dark/50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden shadow-2xl rotate-2 relative">
                <Image
                  fill
                  className="object-cover"
                  alt="Two friends looking at a mountain vista"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlku18l8eX9JZOSJeEfsMjMow6Lv37Xk5OSCheNlX5m_G3eJKompu48F7PmiDGL17aK99U-9tc7sub9NsO9uN_a9mIQ7ylu1EHFikAOTSCiMLPTbc8wKhWJbiGCac0fRxp2ODJCHpopm-FbvZajPN4K3gnlpEs9QqGPJWpL9hNT8ravSNCHPrfBR5B4dKsqfbls7II34D-8BbVaAcDLanz1Gn2sWivDD_FmtHD0CSTyD2B0M9h8SH1cyjBR8emaMn8v9objLiXaw"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 aspect-square w-48 rounded-xl overflow-hidden border-8 border-white dark:border-background-dark shadow-xl -rotate-6 hidden md:block">
                <Image
                  fill
                  className="object-cover"
                  alt="Group of diverse travelers laughing"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIztGxd53C4fhRUu9YNTd7U9AtZoZPuEgnUYUVzNguIYDJszNIf9YjZKde2AuoASZqcE-zFFOIKnFQR_NkQzmKBOeYaUWxrIlvvImtl9t8DPZaHxLERB0n-jJK3_W2q7w48wsAoiHxL-JM4pF11AwF-D-nA1HYGZhEfLhFK2qjxhyBk0NyK5eDBTwxHhNMnCXbEkYHXV3uP5SEyeNaGgu6EKMRACFhdVWogjo3ZjcP38a7JdlodbXRFLiNpRnPkh10XMwRO9mSBw"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                We believe that the best part of traveling isn&apos;t just the
                destination, but the people you share it with. Our mission is to
                bridge the gap between solo wanderlust and shared experiences by
                connecting compatible travelers worldwide.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Whether you&apos;re looking for someone to split the cost of a road
                trip or a local to show you the hidden gems of their city, we
                make it safe and easy to find your tribe.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="font-semibold text-lg">
                  Built with love for the global explorer.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Story Section */}
      <section className="py-20 bg-background-light dark:bg-background-dark">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              The Story
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed italic max-w-4xl mx-auto">
              &quot;It started with a missed train in Florence and a conversation
              with a fellow traveler that turned into a month-long backpacking
              trip across Europe.&quot;
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <span className="text-primary-text font-black text-5xl mb-4 block opacity-60">
                01
              </span>
              <h3 className="text-xl font-bold mb-3">The Spark</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Founded by two solo travelers who realized that the most
                profound moments of their trips were the unplanned encounters
                with others.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 mt-0 lg:mt-8">
              <span className="text-primary-text font-black text-5xl mb-4 block opacity-60">
                02
              </span>
              <h3 className="text-xl font-bold mb-3">The Vision</h3>
              <p className="text-slate-600 dark:text-slate-400">
                The goal was simple: create a platform where safety meets
                spontaneity. A place where &quot;strangers&quot; become travel partners in
                minutes.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 mt-0 lg:mt-16">
              <span className="text-primary-text font-black text-5xl mb-4 block opacity-60">
                03
              </span>
              <h3 className="text-xl font-bold mb-3">Today</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Now with over 500k members across 150 countries, we continue to
                prove that the world is a lot smaller when you have a buddy.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="px-6 py-20 lg:px-20">
        <Container className="bg-slate-900 text-white rounded-3xl py-20 relative overflow-hidden px-6 lg:px-20">
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                Our Core Values
              </h2>
              <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                The principles that guide every feature we build and every
                connection we facilitate.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-slate-400 text-sm">
                  We prioritize human connection and building meaningful
                  relationships across cultures.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Safety</h3>
                <p className="text-slate-400 text-sm">
                  Our top priority is ensuring a secure environment through
                  verification and reviews.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary">
                  <Mountain className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Adventure</h3>
                <p className="text-slate-400 text-sm">
                  We encourage stepping out of comfort zones and exploring the
                  unknown together.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary">
                  <Leaf className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Sustainability</h3>
                <p className="text-slate-400 text-sm">
                  Promoting responsible travel practices and respecting the
                  local environments we visit.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-primary/5 to-transparent pointer-events-none"></div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-background-dark/50">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-lg">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Meet the Dream Team
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                The adventurers, developers, and visionaries working behind the
                scenes.
              </p>
            </div>
            
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Founder & CEO',
                image:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQESVwtvLLtz-TDPq3Cc5fj5OJmBXx4Y-KclTadrGXBIM2Vrp9EgwBsykRJ_hhmUNTbyRQGTtsLjWj4lnNY7v-8qw05PfcwaxAH4BGoJW4g5EaQwrclf503vxDnSYfj-I2tiz6PUFapcCeVsh7MaOQwrBEpZlQgx0fjsDzStCAERBlT9AVtP4YfmHGKGvUu_oUXPKB-_FaSJ-J8PqGDEtdjbL8kobVUY_oYCnoJXkG1fLEoYygE75CQuf3w7II86gLKvjIA6l9TQ',
              },
              {
                name: 'Marcus Thorne',
                role: 'CTO & Lead Engineer',
                image:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCupkV3zPTVGxUPmj32PfogYaczZFtuO4YFE03eJeVug5cxYr5h2VlJsDIxQQOtu1PMF83BMxR-U291mAIebePwRieMpEl4UT-fN7tlenui6NTvwQxlO-JJhxlGH6N9UleG1Np2Z_sayKW_3q0Tc3oGAV7xWvN0bWphrSwZCAzRzqKapeW0v_6zaTIfiTVdqMiN4Jun8ttEmc5BlsVIg_1pKfi_3GMEjxoOfN6Qd8GhBJ3k-JCQtdYrOakt1zuM7FTFcSTQ4lNDZQ',
              },
              {
                name: 'Elena Rodriguez',
                role: 'Head of Design',
                image:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAqkJLg4VUv8SviVnnpUph16rqCoWPUskhHG0GwsyWj-M8Cp4V-iLemEFg7ehpkkXfbQjRQIllFm7b1TZcGNxw-p58BZ0VfRVeHGzpQ-AqTXYa5VJ9rzddgXVaYOU1zwzNU9aIV4HWFQKVHypkF8mJa_KSDq68Cqs5_mgZ65l281MlY7F1jN5EUKq_EUXrJTZObjPIqsf5yg782R0GWzxyM2j49uchgBUbKYXtCsG9m-veLOFj2LwAA-cypWlVhIsXjfpwZ56S30A',
              },
              {
                name: 'David Kim',
                role: 'Community Lead',
                image:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBf7WbvITaqAVnlzg_Hej7cnDzvOPOSFjzhdUgXmon2y_7UGRPyrbw9KUvj6ZCIrkHxpePDcOjQ-cdV6fdbzjv_3G_U00E_fSNTrkK4-CV4-gy9MfIM1Keh6_RTGuRtpVDNHuLV1D9rHxBt-wh075fKx3ftWbIy7B--9vKEOEcxISOzumQafcX4UulZzeY9OWpAUWMEsXEJcw568tCMI9oA10sXifg5ekxR4fJuAleotpe_7AJoE-steL3kAfKwh0gDsnmwk1_tMg',
              },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-4/5 rounded-xl overflow-hidden mb-4 relative">
                  <Image
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    src={member.image}
                  />
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-slate-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <Container>
          <div className="bg-primary rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 text-slate-800">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-5xl font-black mb-6">
                Our Global Footprint
              </h2>
              <p className="text-lg font-medium opacity-80 leading-relaxed">
                Since our launch, we&apos;ve helped thousands of people find their
                travel soulmates. From climbing Kilimanjaro to exploring the
                food stalls of Bangkok, our community is everywhere.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 flex-1">
              <div className="flex flex-col gap-1">
                <span className="text-4xl lg:text-5xl font-black tracking-tighter">
                  500k+
                </span>
                <span className="text-sm font-bold uppercase">
                  Active Members
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl lg:text-5xl font-black tracking-tighter">
                  150+
                </span>
                <span className="text-sm font-bold uppercase">Countries</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl lg:text-5xl font-black tracking-tighter">
                  1.2M
                </span>
                <span className="text-sm font-bold uppercase">
                  Meetups Hosted
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl lg:text-5xl font-black tracking-tighter">
                  4.9/5
                </span>
                <span className="text-sm font-bold uppercase">User Rating</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Join our community today and never travel alone again.
            </p>
            <button className="rounded-full bg-primary px-12 py-5 text-lg font-bold text-background-dark hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-2 cursor-pointer">
              Join the Journey <Rocket className="w-5 h-5" />
            </button>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AboutPage;
