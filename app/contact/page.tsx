import Image from 'next/image';
import {
  AtSign,
  ChevronDown,
  Compass,
  Globe,
  Headset,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  SendHorizontal,
  Youtube,
} from 'lucide-react';
import Container from '@/src/components/ui/Container';

const Contact = () => {
  return (
    <main className="grow">
      {/* Hero Section */}
      <section className="px-6 py-12 lg:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
                <MessageCircle className="w-4 h-4" />
                Connect With Us
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                We&apos;d Love to <span className="text-primary">Hear From You</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg">
                Have questions about finding your next travel companion? Our
                friendly team is here to help you navigate your journey and join
                our growing community.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 relative">
                <Image
                  fill
                  className="object-cover"
                  alt="A group of happy travelers hiking together in a scenic mountain area"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4DUgGGeP5EWYbV1FqJygx2kERaTfbLGHlbUhvZVi35VzIPVZVAfjP2PuUr-sSVDlsVYq9oMJMOOypemKSWW2-55pEMCKyVLxP0PmJgwnJVfe9DHL2vxhSj4z1rFboPjCKe5-MZeT_IcYD1PlD-1NhgKRro-DVSdN_fClorq1XC0sZ_KYgend7eeOE81BcBIFc99PTbWINV3_M2O8Orqoc-q2F3QMg3yKEjwtuQZPS1QclytFi1a54bho3hqNloi3NGmfwX3Au3w"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 aspect-square w-32 rounded-lg bg-primary/30 backdrop-blur-xl flex items-center justify-center -rotate-12">
                <Compass className="text-background-dark w-12 h-12" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 dark:bg-background-dark/30">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 p-8 rounded-xl shadow-sm border border-primary/5">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                <Mail className="text-primary w-6 h-6" />
                Send us a message
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                      Full Name
                    </label>
                    <input
                      className="w-full h-14 rounded-xl border border-primary/10 bg-background-light dark:bg-background-dark/50 focus:ring-1 focus:ring-primary focus:border-primary px-4 outline-none transition-all"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                      Email Address
                    </label>
                    <input
                      className="w-full h-14 rounded-xl border border-primary/10 bg-background-light dark:bg-background-dark/50 focus:ring-1 focus:ring-primary focus:border-primary px-4 outline-none transition-all"
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                    Subject
                  </label>
                  <input
                    className="w-full h-14 rounded-xl border border-primary/10 bg-background-light dark:bg-background-dark/50 focus:ring-1 focus:ring-primary focus:border-primary px-4 outline-none transition-all"
                    placeholder="How can we help?"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                    Message
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-primary/10 bg-background-light dark:bg-background-dark/50 focus:ring-1 focus:ring-primary focus:border-primary p-4 outline-none transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                  ></textarea>
                </div>
                <button
                  className="w-full md:w-auto px-10 py-4 bg-primary text-background-dark font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                  type="submit"
                >
                  Send Message
                  <SendHorizontal className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Map/Address Card */}
              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl shadow-sm border border-primary/5">
                <div className="h-32 rounded-lg bg-primary/10 mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 grayscale opacity-50">
                    <Image
                      fill
                      className="object-cover"
                      alt="Stylized map showing our office location"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR-iEIWQwVF83GdWy_oiiu7oU6FrC52K9tIuKo3w7APHNi3veIIe4TnX4JCooTIwVO0J42b0YvtU-h5g492YH53tuuO1EFR3zsmUcUTH_ubh2MzraTqahCJBUkVHTygzPr4t18ZdcsuTok9zqEMXliIysOnCCE_cCK-RQvD7rduEk5ZXOQPg_dojIqnGxU1EGvgLNf1uq6xXhQMrEaBdgAiz6IO_cUcayPj-Nrj7Iu17ITDFoadHKjwJJXCB4hCcqQyKejZ-ArhA"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="text-primary w-8 h-8" />
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                  Office Headquarters
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  123 Wanderlust Way, Suite 400
                  <br />
                  San Francisco, CA 94103
                </p>
              </div>

              {/* Support Card */}
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                  <Headset className="text-primary w-6 h-6" />
                  Direct Support
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AtSign className="text-slate-400 w-5 h-5 mt-1" />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">
                        Email Us
                      </p>
                      <a
                        className="text-primary font-medium hover:underline"
                        href="mailto:support@travelbuddy.com"
                      >
                        support@travelbuddy.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-slate-400 w-5 h-5 mt-1" />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">
                        Call Us
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        +1 (555) 234-5678
                      </p>
                      <p className="text-xs text-slate-500 italic mt-1">
                        Friendly travelers waiting to talk!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Card */}
              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl shadow-sm border border-primary/5 text-center">
                <h4 className="font-bold mb-4 text-slate-900 dark:text-white">
                  Follow Our Journey
                </h4>
                <div className="flex justify-center gap-4">
                  <a
                    className="size-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-slate-600 hover:bg-primary hover:text-background-dark transition-all"
                    href="#"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <a
                    className="size-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-slate-600 hover:bg-primary hover:text-background-dark transition-all"
                    href="#"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    className="size-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-slate-600 hover:bg-primary hover:text-background-dark transition-all"
                    href="#"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Contact;
