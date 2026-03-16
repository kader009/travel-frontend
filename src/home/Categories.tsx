import Container from '../components/ui/Container';
import {
  Baby,
  Footprints,
  Heart,
  User,
  UserPlus,
} from 'lucide-react';

const Categories = () => {
  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-background-dark px-5 py-2 shadow-sm border border-primary/10">
            <User className="w-5 h-5 text-primary" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">Solo</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-background-dark px-5 py-2 shadow-sm border border-primary/10">
            <Baby className="w-5 h-5 text-primary" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">Family</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-background-dark px-5 py-2 shadow-sm border border-primary/10">
            <UserPlus className="w-5 h-5 text-primary" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">Friends</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-background-dark px-5 py-2 shadow-sm border border-primary/10">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">Couple</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-background-dark px-5 py-2 shadow-sm border border-primary/10">
            <Footprints className="w-5 h-5 text-primary" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">Alone</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Categories;
