import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 0; // Always fetch fresh counts on dashboard load

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch counts in parallel
  const [
    { count: sermonCount },
    { count: eventCount },
    { count: prayerCount }
  ] = await Promise.all([
    supabase.from('sermons').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('prayers').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome Back, Admin</h1>
        <p className="text-gray-500 dark:text-gray-400">Here is what's happening across the FBCC platform today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sermons Card */}
        <Link href="/dashboard/sermons" className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group block">
          <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 transform group-hover:scale-110 transition-transform duration-500 text-fbcc-navy dark:text-blue-300">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Total Sermons</h2>
            <p className="text-5xl font-serif font-bold text-fbcc-navy dark:text-gray-100 mb-4">{sermonCount || 0}</p>
            <div className="flex items-center text-sm font-medium text-fbcc-ocean dark:text-blue-300 group-hover:translate-x-1 transition-transform">
              <span>Manage Sermons &rarr;</span>
            </div>
          </div>
        </Link>

        {/* Events Card */}
        <Link href="/dashboard/events" className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group block">
          <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 transform group-hover:scale-110 transition-transform duration-500 text-fbcc-ocean dark:text-blue-300">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Upcoming Events</h2>
            <p className="text-5xl font-serif font-bold text-fbcc-ocean dark:text-blue-300 mb-4">{eventCount || 0}</p>
            <div className="flex items-center text-sm font-medium text-fbcc-ocean dark:text-blue-300 group-hover:translate-x-1 transition-transform">
              <span>Manage Events &rarr;</span>
            </div>
          </div>
        </Link>

        {/* Prayers Card */}
        <Link href="/dashboard/prayers" className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group block">
          <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 transform group-hover:scale-110 transition-transform duration-500 text-fbcc-earth dark:text-emerald-400">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Pending Prayers</h2>
            <p className="text-5xl font-serif font-bold text-fbcc-earth dark:text-emerald-400 mb-4">{prayerCount || 0}</p>
            <div className="flex items-center text-sm font-medium text-fbcc-earth dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Review Requests &rarr;</span>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
