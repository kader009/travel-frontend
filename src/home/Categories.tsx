import Container from '../components/ui/Container';
import { Baby, Footprints, Heart, User, UserPlus } from 'lucide-react';

const categoriesList = [
  { name: 'Solo', icon: User },
  { name: 'Family', icon: Baby },
  { name: 'Friends', icon: UserPlus },
  { name: 'Couple', icon: Heart },
  { name: 'Alone', icon: Footprints },
];

const Categories = () => {
  return (
    <section className="bg-accent/10 py-12 dark:bg-background-dark">
      <Container>
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black lg:text-5xl">Travel Categories</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Choose your travel category to find compatible travel partners.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {categoriesList.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center gap-2 rounded-full bg-white dark:bg-background-dark px-5 py-2 shadow-xs border border-primary/5 transition-transform hover:scale-105 cursor-pointer dark:border-primary/5"
            >
              <cat.icon className="w-5 h-5 text-primary" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;
