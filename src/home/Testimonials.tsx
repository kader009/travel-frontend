import Container from '../components/ui/Container';
import { IApiResponse } from '@/src/types/dashboard';
import { IReview, ITestimonial } from '@/src/types/review';
import TestimonialSwiper from './TestimonialSwiper';

const Testimonials = async () => {
  let testimonials: ITestimonial[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/v1/reviews/latest?limit=3`,
      {
        next: { revalidate: 3600 }, // Cache and revalidate every hour
      }
    );

    if (res.ok) {
      const reviewsData: IApiResponse<IReview[]> = await res.json();
      const reviews = reviewsData?.data || [];

      testimonials = reviews.map((review) => {
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
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
  }

  // Fallback or empty if none found
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <Container>
        <TestimonialSwiper testimonials={testimonials} />
      </Container>
    </section>
  );
};

export default Testimonials;
