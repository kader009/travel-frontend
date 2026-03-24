'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '../components/ui/Container';
import { Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const testimonials = [
  {
    id: 1,
    text: "I was nervous about solo traveling to Vietnam, but I found Sarah through TravelBuddy. We spent 3 weeks exploring together and now we're planning our next trip to Iceland! Best decision ever.",
    author: 'Lisa K.',
    role: 'Explorer from Canada',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgvuEi-gwVHx-LkT2B57zZIbhbFRNXyGGLBGHP9WvwIb414-NSJkxIdQgVODcgLWROYzpRGk0GcB7Udp4nyrZ4YXRi10CqGyXSH0jtEpI5EYcybyUt-3qVKm0J0frIUe26G6u_hEgJGAnRjj2HFV7a1mZVK_jMMhDwlpLqwRqlQtaArdukDTfdBfCW1O82G8P2H13RXeZGgj7epx7_PfieNR460UKIrSTnqgazZ8C6mT98m0BIpFAS3zLpa5tgAGAk0O9tWSUOyA',
  },
  {
    id: 2,
    text: "Finding hiking partners used to be a challenge. Now, I simply post my itinerary and connect with people who share my pace. It's made my mountain adventures much safer and more fun!",
    author: 'David M.',
    role: 'Hiker from Germany',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAyeUHWAZbVhr03u3r3BEi8bZSVFqkuUdidxVChoAlnh00Zt6T21j6jnOWAlBxNdnxw72UPqwWPAkG0i1hCe8Vzn5jB_MMrrCo2P98TZDjeoCfzltJavewa1NnBcqCHn71vuBz3u8wKJZk5mRgyAdhuAazP04xsU5zjB286lJpI-RFLUfjXiqmISf7EBJwmKuA5N80MXcoyu5af7ijEIkOcO87zWDezVFTgMyM6cDEGTVfWmgOyepgIwn1YgTBWKGd6_XKrim1FYQ',
  },
  {
    id: 3,
    text: "Architecture trips are best when shared. I met three fellow enthusiasts through the community, and we did a marvelous tour of Kyoto's temples together. Life-long memories made.",
    author: 'Yuki T.',
    role: 'Artist from Japan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUcz1MN26gRU_lhwtVAiqHMer0-9QVGSpW3c4EkzaiNtp0uMzvPxqFZu4mjXtgdYs5JQYiLIkDEvIQ6vmyrQzZ3DUHrzRfxnolK5N4PBAuDOd_wlwDNhmdDArTktIT_3Uw2JfWhU3Nr8yhcAWALK8Tlq0zdZexFCygRIyTwBIRA0fTKZT1GE8X7bJwyffaeeKi7uOQEPcpdm9IMQ1c6zpUbNJfm-b_14pf4fsNXUF9ieQ-TD9F55pYNzslRNFIWtfr3f5ICLx8oQ',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-12">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-black lg:text-5xl">
              Voices of the <br />
              <span className="text-primary">Community</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              Hear from our travelers who found more than just a buddy—they
              found life-long friendships and unforgettable memories.
            </p>
            {/* Custom Indicators */}
            <div className="mt-10 flex gap-4">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-12 rounded transition-colors duration-300 ${activeIndex === index ? 'bg-primary' : 'bg-slate-200'}`}
                ></div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="testimonial-swiper p-6! -m-6"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id} className="h-auto">
                  <div className="h-full rounded-xl bg-white p-8 shadow-xs dark:bg-background-dark border border-slate-100 dark:border-slate-800 transition-all duration-300">
                    <Quote className="w-12 h-12 text-primary/30" />
                    <p className="mt-4 text-xl font-medium italic leading-relaxed text-slate-700 dark:text-slate-300">
                      &quot;{item.text}&quot;
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-100 dark:border-slate-800">
                        <Image
                          alt={`Portrait of ${item.author}`}
                          fill
                          className="object-cover"
                          src={item.image}
                        />
                      </div>
                      <div>
                        <p className="font-bold">{item.author}</p>
                        <p className="text-sm text-slate-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
