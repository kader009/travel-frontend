'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ITestimonial } from '@/src/types/review';
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialSwiper = ({ testimonials }: { testimonials: ITestimonial[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
      <div>
        <h1 className="text-4xl font-black lg:text-5xl">
          Voices of the <br />
          <span className="text-primary-text">Community</span>
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
          {testimonials.map((item, idx) => (
            <SwiperSlide key={item.id || idx} className="h-auto">
              <div className="h-full rounded-2xl bg-white p-8 shadow-xs dark:bg-background-dark border border-slate-100 dark:border-slate-800 transition-all duration-300">
                <Quote className="w-12 h-12 text-primary/30" />
                <p className="mt-4 text-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.text}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-100 dark:border-slate-800">
                    <Image
                      alt={`Portrait of ${item.author}`}
                      fill
                      className="object-cover"
                      src={item.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
  );
};

export default TestimonialSwiper;
