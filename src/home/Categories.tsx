import Container from '../components/ui/Container';
import {
  Accessibility,
  Building2,
  Mountain,
  Umbrella,
  Utensils,
} from 'lucide-react';

const Categories = () => {
  return (
    <section className="bg-accent/10 py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-5 py-2 shadow-sm">
            <Mountain className="w-5 h-5 text-primary" />
            <span className="font-semibold">Adventure</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-5 py-2 shadow-sm">
            <Umbrella className="w-5 h-5 text-primary" />
            <span className="font-semibold">Beach</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-5 py-2 shadow-sm">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="font-semibold">City Break</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-5 py-2 shadow-sm">
            <Utensils className="w-5 h-5 text-primary" />
            <span className="font-semibold">Foodie</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-5 py-2 shadow-sm">
            <Accessibility className="w-5 h-5 text-primary" />
            <span className="font-semibold">Wellness</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Categories;
