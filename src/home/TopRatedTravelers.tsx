import Container from '../components/ui/Container';
import { Star } from 'lucide-react';

const TopRatedTravelers = () => {
  return (
    <section className="py-12">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black lg:text-5xl">
            Top Rated Travelers
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Expert companions with high safety and experience ratings.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Traveler 1 */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-xs transition-shadow hover:shadow-sm dark:border-slate-800 dark:bg-background-dark">
            <img
              alt="Profile of male traveler Marco Rossi"
              className="h-20 w-20 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyeUHWAZbVhr03u3r3BEi8bZSVFqkuUdidxVChoAlnh00Zt6T21j6jnOWAlBxNdnxw72UPqwWPAkG0i1hCe8Vzn5jB_MMrrCo2P98TZDjeoCfzltJavewa1NnBcqCHn71vuBz3u8wKJZk5mRgyAdhuAazP04xsU5zjB286lJpI-RFLUfjXiqmISf7EBJwmKuA5N80MXcoyu5af7ijEIkOcO87zWDezVFTgMyM6cDEGTVfWmgOyepgIwn1YgTBWKGd6_XKrim1FYQ"
            />
            <div>
              <h4 className="text-lg font-bold">Marco Rossi</h4>
              <div className="flex items-center text-primary">
                <Star className="w-4 h-4 fill-primary" />
                <span className="text-sm font-bold ml-1">4.9 (42 reviews)</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Loves Hiking & Photography
              </p>
            </div>
          </div>
          {/* Traveler 2 */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-xs transition-shadow hover:shadow-sm dark:border-slate-800 dark:bg-background-dark">
            <img
              alt="Profile of female traveler Elena Vance"
              className="h-20 w-20 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5sgDqxfWCwhUyHqHrtESnEBoOKEJNKgdEaHVIu9CELcALGo8oCvTaaw6t6Lt26PH7zwg_Cn-ro4mWgQK2JcrxkBh1fTmuqDdjUa8kcIadamBnvseeXLst0ugfK9m7T0RNDR0xXlM8XXMr85UbCimSb18cNgacxFiJRffkh5HFk6Mg49mYlmwmMUZRcIm7hhlqK0JmvTPlPGcHBlXWBYo_qOq8peV9pehV6cikhPFgGchwGJsvdQjLWS1re3Ft4bj3v08tb841g"
            />
            <div>
              <h4 className="text-lg font-bold">Elena Vance</h4>
              <div className="flex items-center text-primary">
                <Star className="w-4 h-4 fill-primary" />
                <span className="text-sm font-bold ml-1">5.0 (28 reviews)</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">Backpacking Expert</p>
            </div>
          </div>
          {/* Traveler 3 */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-xs transition-shadow hover:shadow-sm dark:border-slate-800 dark:bg-background-dark">
            <img
              alt="Profile of young traveler Jordan Smith"
              className="h-20 w-20 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUcz1MN26gRU_lhwtVAiqHMer0-9QVGSpW3c4EkzaiNtp0uMzvPxqFZu4mjXtgdYs5JQYiLIkDEvIQ6vmyrQzZ3DUHrzRfxnolK5N4PBAuDOd_wlwDNhmdDArTktIT_3Uw2JfWhU3Nr8yhcAWALK8Tlq0zdZexFCygRIyTwBIRA0fTKZT1GE8X7bJwyffaeeKi7uOQEPcpdm9IMQ1c6zpUbNJfm-b_14pf4fsNXUF9ieQ-TD9F55pYNzslRNFIWtfr3f5ICLx8oQ"
            />
            <div>
              <h4 className="text-lg font-bold">Jordan Smith</h4>
              <div className="flex items-center text-primary">
                <Star className="w-4 h-4 fill-primary" />
                <span className="text-sm font-bold ml-1">4.8 (65 reviews)</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Digital Nomad & Foodie
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopRatedTravelers;
