import Container from '../components/ui/Container';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="bg-primary/5 py-20 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-4xl font-black lg:text-5xl">
              Voices of the <br />
              <span className="text-primary">Community</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              Hear from our travelers who found more than just a buddy—they
              found life-long friendships and unforgettable memories.
            </p>
            <div className="mt-10 flex gap-4">
              <div className="h-1 w-12 rounded bg-primary"></div>
              <div className="h-1 w-12 rounded bg-slate-200"></div>
              <div className="h-1 w-12 rounded bg-slate-200"></div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-xl bg-white p-8 shadow-xl dark:bg-slate-900">
              <Quote className="w-12 h-12 text-primary/30" />
              <p className="mt-4 text-xl font-medium italic leading-relaxed text-slate-700 dark:text-slate-300">
                "I was nervous about solo traveling to Vietnam, but I found
                Sarah through TravelBuddy. We spent 3 weeks exploring together
                and now we're planning our next trip to Iceland! Best decision
                ever."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <img
                  alt="Portrait of a female traveler smiling, Lisa K."
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgvuEi-gwVHx-LkT2B57zZIbhbFRNXyGGLBGHP9WvwIb414-NSJkxIdQgVODcgLWROYzpRGk0GcB7Udp4nyrZ4YXRi10CqGyXSH0jtEpI5EYcybyUt-3qVKm0J0frIUe26G6u_hEgJGAnRjj2HFV7a1mZVK_jMMhDwlpLqwRqlQtaArdukDTfdBfCW1O82G8P2H13RXeZGgj7epx7_PfieNR460UKIrSTnqgazZ8C6mT98m0BIpFAS3zLpa5tgAGAk0O9tWSUOyA"
                />
                <div>
                  <p className="font-bold">Lisa K.</p>
                  <p className="text-sm text-slate-500">Explorer from Canada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
