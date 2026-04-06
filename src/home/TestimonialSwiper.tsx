'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ITestimonial } from '@/src/types/review';
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialSwiper = ({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center overflow-hidden">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
          Voices of the <br />
          <span className="text-primary-text uppercase tracking-tight">
            Community
          </span>
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
          Hear from our travelers who found more than just a buddy—they found
          life-long friendships and unforgettable memories.
        </p>
        {/* Custom Indicators */}
        <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start gap-3 sm:gap-4">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8! sm:w-12! rounded transition-colors duration-300 ${activeIndex === index ? 'bg-primary' : 'bg-slate-200 dark:bg-white'}`}
            ></div>
          ))}
        </div>
      </div>
      <div className="relative w-full min-w-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="testimonial-swiper pb-12! px-1! sm:px-0!"
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={item.id || idx} className="h-auto">
              <div className="h-full rounded-2xl bg-white p-6 sm:p-8 shadow-xs dark:bg-background-dark border border-slate-100 dark:border-slate-800 transition-all duration-300">
                <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-primary/30" />
                <p className="mt-4 text-lg sm:text-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.text}
                </p>
                <div className="mt-6 sm:mt-8 flex items-center gap-4">
                  <div className="relative h-16 w-16 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border border-slate-100 dark:border-slate-800">
                    <Image
                      alt={`Portrait of ${item.author}`}
                      fill
                      className="object-cover"
                      src={item.image}
                      sizes="52px"
                      quality={80}
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="font-bold text-sm sm:text-base truncate">
                      {item.author}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 truncate">
                      {item.role}
                    </p>
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
