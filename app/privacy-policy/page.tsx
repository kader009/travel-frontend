import {
  Info,
  Database,
  User,
  MapPin,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  ShieldCheck,
  Shield,
  Gavel,
  Cookie,
  Mail,
} from 'lucide-react';
import Container from '@/src/components/ui/Container';

const PrivacyPolicy = () => {
  return (
    <main className="grow py-12">
      <Container>
        <div>
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
              Legal Information
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
          </div>

          {/* Content Container */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 space-y-12">
            {/* Introduction */}
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <Info className="text-primary w-6 h-6" />
                Introduction
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                At Travel Buddy &amp; Meetup, we value your privacy and are
                committed to protecting your personal data. This policy explains
                how we handle your information when you use our platform to
                connect with fellow travelers. Our goal is to be transparent
                about the data we collect and how it enhances your experience
                while ensuring your security remains our top priority.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <Database className="text-primary w-6 h-6" />
                Information We Collect
              </h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                We collect information that you provide directly to us when you
                create an account, update your profile, or communicate with
                other users:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <User className="text-primary w-5 h-5 shrink-0" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Account details (name, email, password)
                  </span>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <MapPin className="text-primary w-5 h-5 shrink-0" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Location data and travel preferences
                  </span>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <ImageIcon className="text-primary w-5 h-5 shrink-0" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Profile photos and trip media
                  </span>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <MessageSquare className="text-primary w-5 h-5 shrink-0" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Messages and community interactions
                  </span>
                </li>
              </ul>
            </section>

            {/* How We Use Your Data */}
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <Settings className="text-primary w-6 h-6" />
                How We Use Your Data
              </h3>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-4">
                <p>
                  We use the collected information for various purposes,
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Matching you with compatible travel buddies based on
                    interests and location.
                  </li>
                  <li>
                    Personalizing your experience with relevant meetup
                    recommendations.
                  </li>
                  <li>
                    Sending important updates about our services and security
                    alerts.
                  </li>
                  <li>
                    Improving our platform&apos;s functionality through
                    anonymized analytics.
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <ShieldCheck className="text-primary w-6 h-6" />
                Data Security
              </h3>
              <div className="p-6 rounded-xl bg-slate-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="mb-4 text-slate-300">
                    We implement industry-standard security measures to protect
                    your data from unauthorized access, alteration, or
                    destruction. This includes:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30">
                      End-to-End Encryption
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30">
                      Secure Socket Layer (SSL)
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30">
                      Two-Factor Authentication
                    </span>
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Shield className="w-32 h-32" />
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <Gavel className="text-primary w-6 h-6" />
                Your Rights
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
                You have control over your personal information. Depending on
                your location, you may have the following rights:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-primary/50 transition-colors">
                  <span className="font-bold block mb-1 text-slate-900 dark:text-white">
                    Access &amp; Portability
                  </span>
                  <span className="text-sm text-slate-500">
                    Request a copy of the data we hold about you.
                  </span>
                </div>
                <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-primary/50 transition-colors">
                  <span className="font-bold block mb-1 text-slate-900 dark:text-white">
                    Correction
                  </span>
                  <span className="text-sm text-slate-500">
                    Update or correct any inaccuracies in your profile.
                  </span>
                </div>
                <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-primary/50 transition-colors">
                  <span className="font-bold block mb-1 text-slate-900 dark:text-white">
                    Deletion
                  </span>
                  <span className="text-sm text-slate-500">
                    Request the removal of your personal information from our
                    systems.
                  </span>
                </div>
                <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-primary/50 transition-colors">
                  <span className="font-bold block mb-1 text-slate-900 dark:text-white">
                    Object to Processing
                  </span>
                  <span className="text-sm text-slate-500">
                    Opt-out of certain data usage activities.
                  </span>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <Cookie className="text-primary w-6 h-6" />
                Cookies
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                We use cookies to enhance your browsing experience. Cookies are
                small text files stored on your device that help us remember
                your preferences and understand how you interact with our site.
                You can manage your cookie preferences through your browser
                settings at any time.
              </p>
            </section>

            {/* Contact Us */}
            <section className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-primary/5 border border-primary/20">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                    Questions about your privacy?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Our privacy team is here to help you understand your data
                    rights.
                  </p>
                </div>
                <button className="flex items-center gap-2 px-8 py-3 bg-primary text-slate-900 font-bold rounded-full hover:scale-105 transition-transform cursor-pointer">
                  <Mail className="w-5 h-5" />
                  Contact Privacy Team
                </button>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default PrivacyPolicy;
