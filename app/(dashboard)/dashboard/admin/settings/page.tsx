const AdminSettingsPage = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-2xl font-black text-slate-900 dark:text-white">Settings</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage admin account preferences.</p>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
      {[
        { label: 'Email Notifications', desc: 'Receive alerts for new registrations and reports' },
        { label: 'Maintenance Mode', desc: 'Temporarily restrict access to the platform' },
        { label: 'Auto-Approve Plans', desc: 'Automatically approve new travel plans' },
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
  </div>
);

export default AdminSettingsPage;
