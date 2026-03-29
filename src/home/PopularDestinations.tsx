import Image from 'next/image';
import Container from '../components/ui/Container';
import { Users } from 'lucide-react';
import { ITravelPlan, IPopularDestination } from '@/src/types/travelPlan';
import { IApiResponse } from '@/src/types/dashboard';

const PopularDestinations = async () => {
  let destinations: IPopularDestination[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/v1/travel-plans`,
      {
        next: { revalidate: 3600 }, // Cache and revalidate every hour
      },
    );

    if (res.ok) {
      const plansData: IApiResponse<ITravelPlan[]> = await res.json();

      if (plansData?.data) {
        const plans = plansData.data;

        // Group by destination and count
        const destinationMap = new Map<
          string,
          { count: number; image?: string; id?: string }
        >();

        plans.forEach((plan) => {
          const dest = plan.destination;
          if (destinationMap.has(dest)) {
            const item = destinationMap.get(dest)!;
            item.count += 1;
            // Prefer images from newer plans or if missing
            if (!item.image && plan.images?.[0]) {
              item.image = plan.images[0];
            }
          } else {
            destinationMap.set(dest, {
              id: plan._id,
              count: 1,
              image: plan.images?.[0],
            });
          }
        });

        // Convert to array and sort by count
        destinations = Array.from(destinationMap.entries())
          .map(([destination, data]) => ({
            destination,
            ...data,
          }))
          .sort((destA, destB) => destB.count - destA.count)
          .slice(0, 8);
      }
    }
  } catch (error) {
    console.error('Error fetching popular destinations:', error);
  }

  // Fallback if no destinations (empty list or error)
  if (destinations.length === 0) {
    return null; // Or show placeholders
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
          {destinations.map((dest) => (
            <div
              key={dest.id || dest.destination}
              className="group relative aspect-3/4 overflow-hidden rounded-2xl shadow-xs"
            >
              <Image
                fill
                alt={dest.destination}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                src={
                  dest.image ||
                  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=700&fit=crop'
                }
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 380px"
                quality={80}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h2 className="text-xl font-bold">{dest.destination}</h2>
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
