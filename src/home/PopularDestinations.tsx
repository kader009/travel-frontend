'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import Container from '../components/ui/Container';
import { Users, Loader2 } from 'lucide-react';
import { useGetAllTravelPlansQuery } from '@/src/redux/store/api/endApi';

const PopularDestinations = () => {
  const { data: plansData, isLoading } = useGetAllTravelPlansQuery(undefined);

  const destinations = useMemo(() => {
    if (!plansData?.data) return [];

    const plans = plansData.data as Array<{
      destination: string;
      images?: string[];
    }>;

    // Group by destination and count
    const destinationMap = new Map<string, { count: number; image?: string }>();

    plans.forEach((plan) => {
      const dest = plan.destination;
      if (destinationMap.has(dest)) {
        const item = destinationMap.get(dest)!;
        item.count += 1;
      } else {
        destinationMap.set(dest, {
          count: 1,
          image: plan.images?.[0],
        });
      }
    });

    // Convert to array and sort by count
    const sorted = Array.from(destinationMap.entries())
      .map(([destination, data]) => ({
        destination,
        ...data,
      }))
      .sort((destA, destB) => destB.count - destA.count)
      .slice(0, 8); // Top 8 destinations

    return sorted;
  }, [plansData]);

  if (isLoading) {
    return (
      <section className="dark:bg-background-dark py-12">
        <Container>
          <div className="flex items-center justify-center min-h-96">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="dark:bg-background-dark py-12">
      <Container>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black lg:text-5xl">
              Popular Destinations
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Trending spots where people are looking for buddies right now.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="group relative aspect-3/4 overflow-hidden rounded-xl shadow-xs"
            >
              <Image
                fill
                alt={dest.destination}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                src={
                  dest.image ||
                  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=700&fit=crop'
                }
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h4 className="text-xl font-bold">{dest.destination}</h4>
                <div className="mt-2 flex items-center gap-1 text-primary">
                  <Users className="w-3 h-3" />
                  <span className="text-xs font-bold uppercase">
                    {dest.count} Plans
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularDestinations;
