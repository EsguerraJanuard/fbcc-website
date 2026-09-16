import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: admin } = await supabase.from('admins').select('id').eq('id', user.id).single();
  if (!admin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-fbcc-navy text-white flex flex-col shadow-xl z-20 relative">
        <div className="h-20 flex items-center px-6 border-b border-white/10 bg-black/10">
          <Link href="/dashboard" className="flex items-center gap-3">
            <img src="/logo.jpg" alt="FBCC Logo" className="w-8 h-8 rounded-full" />
            <span className="text-xl font-serif font-bold tracking-wide">FBCC Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <Link href="/dashboard/sermons" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-fbcc-ocean hover:shadow-md transition-all font-medium">
            <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            Sermons
          </Link>
          <Link href="/dashboard/events" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-fbcc-ocean hover:shadow-md transition-all font-medium">
            <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Events
          </Link>
          <Link href="/dashboard/prayers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-fbcc-ocean hover:shadow-md transition-all font-medium">
            <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            Prayers
          </Link>
          <div className="pt-4 mt-4 border-t border-white/10">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tools</p>
            <Link href="/dashboard/celebrant-tool" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-fbcc-earth hover:bg-green-700 hover:shadow-md transition-all font-medium">
              <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Celebrant Canvas
            </Link>
          </div>
        </nav>
        
        <div className="p-4 border-t border-white/10 text-sm bg-black/20">
          <Link href="/" className="flex items-center text-gray-300 hover:text-white transition">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center px-8 justify-end shadow-sm">
          <div className="text-sm font-medium text-gray-600">
            Admin User
          </div>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
