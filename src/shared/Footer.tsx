import { Compass, Globe, Mail, MessageSquare } from 'lucide-react';
import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-background-dark">
            <div className="mx-auto max-w-[1440px] px-6">
                <div className="grid gap-12 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-background-dark">
                                <Compass className="w-5 h-5 font-bold" />
                            </div>
                            <h2 className="text-lg font-extrabold tracking-tight">TravelBuddy</h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Connecting travelers around the world since 2024. Your adventure companion is just a click away.</p>
                        <div className="flex gap-4">
                            <a className="text-slate-400 hover:text-primary" href="#"><Globe className="w-5 h-5" /></a>
                            <a className="text-slate-400 hover:text-primary" href="#"><MessageSquare className="w-5 h-5" /></a>
                            <a className="text-slate-400 hover:text-primary" href="#"><Mail className="w-5 h-5" /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Destinations</h3>
                        <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Europe Trips</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Asia Adventure</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Americas Exploration</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">African Safaris</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Platform</h3>
                        <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">How it Works</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Safety Guidelines</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Pricing & Plans</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Community Forum</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Newsletter</h3>
                        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Get weekly travel tips and new trip alerts.</p>
                        <div className="flex overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
                            <input className="w-full bg-transparent px-4 py-2 text-sm focus:outline-none" placeholder="Your email" type="email" />
                            <button className="bg-primary px-4 py-2 text-sm font-bold text-background-dark">Join</button>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-100 pt-8 text-center text-xs text-slate-400 dark:border-slate-800">
                    <p>© 2024 TravelBuddy Inc. All rights reserved. Nature-inspired for global explorers.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
