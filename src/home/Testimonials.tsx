'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '../components/ui/Container';
import { Quote, Loader2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetLatestReviewsQuery } from '@/src/redux/store/api/endApi';
import { IReview } from '@/src/types/review';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: reviewsData, isLoading } = useGetLatestReviewsQuery({
    limit: 3,
  });

  const testimonials = (reviewsData?.data || []).map((review: IReview) => {
    const destination =
      typeof review.travelPlan === 'string'
        ? 'Somewhere'
        : review.travelPlan?.destination || 'Somewhere';
    return {
      id: review._id,
      text: review.comment,
      author:
        typeof review.reviewer === 'string'
          ? 'Anonymous'
          : review.reviewer?.name || 'Anonymous',
      role: `Traveled to ${destination}`,
      image:
        typeof review.reviewer === 'string'
          ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
          : review.reviewer?.image ||
            'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    };
  });

  if (isLoading) {
    return (
      <section className="py-12">
        <Container>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        </Container>
      </section>
    );
  }

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
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          loading='lazy'
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
