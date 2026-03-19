const UserSettingsPage = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-2xl font-black text-slate-900 dark:text-white">Settings</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage account preferences.</p>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
      {[
        { label: 'Email Notifications', desc: 'Receive match and message alerts via email' },
        { label: 'Profile Visibility', desc: 'Allow other travelers to view your profile' },
        { label: 'Show Online Status', desc: 'Let others see when you are online' },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{item.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
          </div>
          <button className="w-11 h-6 bg-primary rounded-full relative cursor-pointer transition">
            <span className="size-4 bg-white rounded-full absolute top-1 right-1 shadow" />
          </button>
        </div>
      ))}
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-rose-100 dark:border-rose-900/30 p-6">
      <h2 className="font-black text-slate-900 dark:text-white mb-1">Danger Zone</h2>
      <p className="text-sm text-slate-400 mb-4">Permanently delete your account and all data.</p>
      <button className="px-5 py-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-bold text-sm rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/40 transition cursor-pointer">
        Delete Account
      </button>
    </div>
  </div>
);

export default UserSettingsPage;
