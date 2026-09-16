import FadeIn from "@/components/FadeIn";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 0; // Always fresh

type Props = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function PrayerWallPage({ searchParams }: Props) {
  const supabase = await createClient();
  const params = await searchParams;
  const isSuccess = params.success === "true";
  
  // Fetch only approved prayers
  const { data: prayers } = await supabase
    .from("prayers")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  return (
    <div className="py-20 flex-1 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <FadeIn delay={0.1} direction="up">
            <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-2">Intercessory Ministry</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fbcc-navy dark:text-gray-100 mb-6">Prayer Wall</h1>
            
            <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border-l-4 border-fbcc-ocean mb-8 text-left shadow-sm">
              <p className="font-serif italic text-gray-700 dark:text-gray-300 mb-2 text-lg">
                "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God."
              </p>
              <p className="text-sm font-bold text-fbcc-ocean dark:text-blue-300 uppercase tracking-wider">— Philippians 4:6 (KJV)</p>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We believe in the power of prayer. Submit your prayer request below, and our church family will intercede on your behalf.
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Submit Prayer Form */}
          <div className="w-full lg:w-4/12 lg:sticky lg:top-28">
            <FadeIn delay={0.2} direction="up">
              <div className="bg-fbcc-navy text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                
                <h3 className="text-2xl font-serif font-bold mb-2 relative z-10">Submit a Request</h3>
                <p className="text-blue-100 mb-6 text-sm relative z-10">Your request will be reviewed by our pastoral team before appearing on the wall.</p>
                
                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl relative z-10 flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                      <h4 className="font-bold text-white text-sm">Prayer Submitted</h4>
                      <p className="text-green-100 text-xs mt-1">Our pastoral team will review it shortly. God bless you!</p>
                    </div>
                  </div>
                )}
                
                <form action="/api/prayers" method="POST" className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-sm font-bold mb-1.5 uppercase tracking-wide text-blue-200 text-xs">Your Name (or Anonymous)</label>
                    <input type="text" name="author_name" required placeholder="John D. Baptist" className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:bg-white/20 focus:ring-2 focus:ring-white/30 transition-all outline-none placeholder-white/40 text-white" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-1.5 uppercase tracking-wide text-blue-200 text-xs">Prayer Request</label>
                    <textarea name="content" required rows={4} placeholder="How can we pray for you?" className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:bg-white/20 focus:ring-2 focus:ring-white/30 transition-all outline-none placeholder-white/40 text-white resize-none"></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-white text-fbcc-navy hover:bg-gray-100 font-bold py-3.5 px-6 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    Send Prayer Request
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>

          {/* Wall of Prayers (Masonry Layout) */}
          <div className="w-full lg:w-8/12">
            {!prayers || prayers.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center flex flex-col items-center">
                <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No public prayers yet.</h3>
                <p className="text-gray-500 dark:text-gray-400">Be the first to submit a prayer request using the form.</p>
              </div>
            ) : (
              <div className="columns-1 md:columns-2 gap-6 space-y-6">
                {prayers.map((prayer, index) => (
                  <FadeIn key={prayer.id} delay={0.1 * (index % 4)} direction="up" className="break-inside-avoid">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-fbcc-earth"></div>
                      
                      <p className="text-gray-800 dark:text-gray-200 text-[15px] leading-relaxed italic mb-6">
                        "{prayer.content}"
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-fbcc-navy dark:text-gray-100 font-bold text-sm">
                          {prayer.author_name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{prayer.author_name}</p>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{new Date(prayer.created_at).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                      
                      {/* Pray button (Interactive UI element just for engagement) */}
                      <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                        <button className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-fbcc-earth dark:text-emerald-400 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 group-hover:text-fbcc-earth dark:group-hover:text-emerald-400 dark:text-emerald-400 dark:group-hover:text-emerald-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                          I prayed for this
                        </button>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
