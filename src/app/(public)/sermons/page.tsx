import { createClient } from "@/utils/supabase/server";
import FadeIn from "@/components/FadeIn";

export const revalidate = 60; // Revalidate every minute

export default async function SermonsPage() {
  const supabase = await createClient();
  
  // Fetch sermons from Supabase, ordered by date descending
  const { data: sermons, error } = await supabase
    .from("sermons")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch sermons from database.");
  }

  return (
    <div className="py-20 flex-1 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-2">Message Library</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-fbcc-navy dark:text-gray-100 mb-6">Latest Sermons</h1>
          
          <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border-l-4 border-fbcc-ocean mb-8 text-left">
            <p className="font-serif italic text-gray-700 dark:text-gray-300 mb-2 text-lg">
              "So then faith cometh by hearing, and hearing by the word of God."
            </p>
            <p className="text-sm font-bold text-fbcc-ocean dark:text-blue-300 uppercase tracking-wider">— Romans 10:17 (KJV)</p>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Listen to our recent Sunday messages and Wednesday Bible studies. Whether you missed a service or want to reflect on God's Word again, our library is here to bless you.
          </p>
        </div>

        {/* Sermons Grid */}
        {sermons && sermons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map((sermon, index) => (
              <FadeIn key={sermon.id} delay={0.1 * (index % 6)} direction="up" className="h-full">
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
                  <div className="p-8 flex-1 flex flex-col relative">
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-gradient-to-br from-fbcc-ocean/10 to-fbcc-earth/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div className="inline-flex items-center gap-2 text-sm text-fbcc-earth dark:text-emerald-400 font-bold uppercase tracking-wider mb-4">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(sermon.date).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                      {sermon.title}
                    </h3>
                    <p className="text-fbcc-ocean dark:text-blue-300 font-medium mb-5 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {sermon.preacher}
                    </p>
                    
                    {sermon.transcript && (
                      <p className="text-gray-600 dark:text-gray-400 text-base mb-8 line-clamp-3 leading-relaxed flex-1">
                        {sermon.transcript}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-4">
                      <a 
                        href={sermon.drive_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full bg-gray-50 hover:bg-fbcc-navy text-gray-700 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-fbcc-ocean font-bold py-4 px-4 rounded-xl transition-all duration-300 group/btn shadow-sm"
                      >
                        <svg className="w-5 h-5 mr-2 text-fbcc-ocean dark:text-blue-300 group-hover/btn:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Listen to Audio
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={0.2} direction="up">
            <div className="text-center py-24 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Sermons Yet</h3>
              <p className="text-gray-500 dark:text-gray-400">Our digital archive is currently empty. Check back soon for new messages.</p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
