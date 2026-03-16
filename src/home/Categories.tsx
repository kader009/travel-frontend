import Container from '../components/ui/Container';
import {
  Baby,
  Footprints,
  Heart,
  User,
  UserPlus,
} from 'lucide-react';

const categories = [
  { name: 'Solo', icon: User, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Family', icon: Baby, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Friends', icon: UserPlus, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'Couple', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { name: 'Alone', icon: Footprints, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

const Categories = () => {
  return (
    <section className="py-12">
      <Container>
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black lg:text-5xl">Travel Categories</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Choose your travel category to find compatible travel partners.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.name}
              className="group relative flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-background-dark border border-slate-100 dark:border-slate-800 transition-all hover:border-primary/50 hover:shadow-xl hover:-translate-y-2 overflow-hidden cursor-pointer"
            >
              {/* Background Glow Effect on Hover */}
              <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${cat.bg} opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[3] animate-pulse`}></div>
              
              <cat.icon className={`w-12 h-12 ${cat.color} mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110`} />
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white relative z-10">
                {cat.name}
              </h3>
              
              <div className="mt-4 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;
