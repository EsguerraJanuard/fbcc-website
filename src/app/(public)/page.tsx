import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const supabase = await createClient();
  const today = new Date().toISOString();

  // Fetch Latest 3 Sermons
  const { data: latestSermons } = await supabase
    .from("sermons")
    .select("*")
    .order("date", { ascending: false })
    .limit(3);

  // Fetch Upcoming Events
  const { data: upcomingEvents } = await supabase
    .from("events")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true })
    .limit(3);

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Cinematic Hero Section with Gradient */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-fbcc-navy">
        {/* Beautiful Abstract Gradient Background instead of a stock photo */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-fbcc-navy to-fbcc-ocean opacity-90"></div>
        <div className="absolute inset-0 z-1 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        {/* Deep, rich overlays for maximum contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl">
            <FadeIn delay={0.1} direction="up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white leading-[1.1] mb-6 drop-shadow-2xl">
                First Baptist Church <br className="hidden md:block"/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-400 to-emerald-300">of Cabalantian</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3} direction="up">
              <p className="text-xl md:text-2xl text-gray-200 font-light mb-10 max-w-2xl leading-relaxed drop-shadow-md border-l-4 border-fbcc-ocean pl-6 py-2">
                "Thy word is a lamp unto my feet, and a light unto my path." <br/>
                <span className="text-sm font-bold tracking-widest text-emerald-400 uppercase mt-2 block">— Psalm 119:105</span>
              </p>
            </FadeIn>
            <FadeIn delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link 
                  href="/about" 
                  className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold text-gray-950 bg-white hover:bg-gray-100 rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  Read Our Story
                </Link>
                <Link 
                  href="/sermons" 
                  className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold text-white border border-white/30 backdrop-blur-md hover:bg-white/10 rounded-full transition-all duration-300 hover:-translate-y-1"
                >
                  Listen to Sermons
                </Link>
                <a 
                  href="https://www.facebook.com/fbccabalantian" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold text-white bg-[#1877F2]/20 border border-[#1877F2]/50 backdrop-blur-md hover:bg-[#1877F2] rounded-full transition-all duration-300 hover:-translate-y-1 group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  Watch Live on FB
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. Pastor's Welcome */}
      <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-5/12 w-full">
              <FadeIn delay={0.1} direction="right" className="relative">
                <div className="absolute inset-0 bg-fbcc-ocean/20 rounded-[3rem] transform -rotate-6 scale-105 z-0"></div>
                <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-800 rounded-[3rem] overflow-hidden relative z-10 shadow-2xl border-8 border-white dark:border-gray-900 flex items-center justify-center">
                  <svg className="w-40 h-40 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </FadeIn>
            </div>
            
            <div className="lg:w-7/12 w-full">
              <FadeIn delay={0.2} direction="left">
                <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-2">Welcome Home</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-8">A Message from Pastor Joel</h3>
                
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                  <p>
                    Welcome to First Baptist Church of Cabalantian. We are a family of believers who have experienced the profound grace of God, standing resilient through the hardest trials—even the loss of our original building to the Mt. Pinatubo eruption. 
                  </p>
                  <p>
                    Whether you are deeply rooted in your faith or just beginning to ask questions about God, there is a place for you here. Our doors are open, our hearts are expectant, and we cannot wait to worship alongside you.
                  </p>
                </div>
                
                <div className="mt-10 pt-10 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="text-2xl font-serif font-bold text-fbcc-navy dark:text-white">Joel P. Sariego</h4>
                  <p className="text-fbcc-ocean dark:text-blue-300 font-bold tracking-widest uppercase text-sm mt-1">Senior Pastor</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sleek Service Schedule Timeline */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.1} direction="up" className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-ocean dark:text-blue-300 mb-2">Gather With Us</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">Service Schedule</h3>
          </FadeIn>
          
          <div className="max-w-5xl mx-auto">
            <FadeIn delay={0.2} direction="up">
              <div className="bg-white dark:bg-gray-950 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 justify-between items-center md:items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800">
                  
                  <div className="flex-1 flex flex-col items-center text-center w-full py-6 md:py-0 px-4">
                    <div className="text-fbcc-ocean dark:text-blue-300 mb-4">
                      <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">Sunday Worship</h4>
                    <p className="text-3xl font-light text-fbcc-navy dark:text-fbcc-ocean mb-2">6:30 AM</p>
                    <p className="text-sm text-gray-500">Every Sunday Morning</p>
                  </div>

                  <div className="flex-1 flex flex-col items-center text-center w-full py-6 md:py-0 px-4">
                    <div className="text-fbcc-earth dark:text-emerald-400 mb-4">
                      <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">Sunday School</h4>
                    <p className="text-3xl font-light text-fbcc-navy dark:text-fbcc-ocean mb-2">8:30 AM</p>
                    <p className="text-sm text-gray-500">Bible study for all ages</p>
                  </div>

                  <div className="flex-1 flex flex-col items-center text-center w-full py-6 md:py-0 px-4">
                    <div className="text-indigo-500 mb-4">
                      <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">Vesper Service</h4>
                    <p className="text-3xl font-light text-fbcc-navy dark:text-fbcc-ocean mb-2">5:00 PM</p>
                    <p className="text-sm text-gray-500">Sunday Evening Worship</p>
                  </div>

                  <div className="flex-1 flex flex-col items-center text-center w-full py-6 md:py-0 px-4">
                    <div className="text-orange-500 mb-4">
                      <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">Prayer Meeting</h4>
                    <p className="text-3xl font-light text-fbcc-navy dark:text-fbcc-ocean mb-2">6:00 PM</p>
                    <p className="text-sm text-gray-500">Every Wednesday Night</p>
                  </div>
                  
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Latest Sermons Preview */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <FadeIn delay={0.1} direction="left">
              <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-2">Recent Messages</h2>
              <h3 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">Latest Sermons</h3>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Link href="/sermons" className="text-fbcc-ocean dark:text-blue-300 font-bold hover:underline flex items-center group">
                View All Sermons
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </FadeIn>
          </div>

          {latestSermons && latestSermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestSermons.map((sermon, index) => (
                <FadeIn key={sermon.id} delay={0.1 * index} direction="up" className="h-full">
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group p-8">
                    <div className="inline-flex items-center gap-2 text-sm text-fbcc-earth dark:text-emerald-400 font-bold uppercase tracking-wider mb-4">
                      {new Date(sermon.date).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                      {sermon.title}
                    </h3>
                    <p className="text-fbcc-ocean dark:text-blue-300 font-medium mb-6 text-sm">By {sermon.preacher}</p>
                    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                      <a 
                        href={sermon.drive_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-900 dark:text-gray-300 font-bold hover:text-fbcc-ocean dark:hover:text-blue-300 dark:text-blue-300 dark:hover:text-fbcc-ocean dark:text-blue-300 flex items-center transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        Listen Now
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">No recent sermons available.</div>
          )}
        </div>
      </section>

      {/* 5. Upcoming Events Preview (Only shows if there are events) */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn delay={0.1} direction="up" className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-ocean dark:text-blue-300 mb-2">Mark Your Calendar</h2>
              <h3 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">Upcoming Events</h3>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {upcomingEvents.map((event, index) => (
                <FadeIn key={event.id} delay={0.1 * index} direction="up" className="h-full">
                  <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border-l-4 border-fbcc-earth shadow-sm h-full flex flex-col">
                    <p className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                      {new Date(event.date).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{event.title}</h4>
                    {event.description && <p className="text-gray-600 dark:text-gray-400 text-sm mt-auto pt-4">{event.description}</p>}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Location Section */}
      <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden border-t border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 bg-fbcc-navy/5 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-1/2 space-y-8">
              <FadeIn delay={0.1} direction="right">
                <div>
                  <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-2">Visit Us</h2>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-6">Join Our Family</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    We are located in Purok 1, Bulaon, City of San Fernando, Pampanga. We have ample parking and a welcoming environment for your entire family. We would love to have you worship with us!
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2} direction="right">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-fbcc-ocean/10 p-3 rounded-xl text-fbcc-ocean dark:text-blue-300 mt-1">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">Address</h4>
                      <p className="text-gray-600 dark:text-gray-400">Purok 1, Bulaon<br />City of San Fernando, Pampanga</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3} direction="right">
                <Link href="/contact" className="inline-flex items-center text-fbcc-ocean dark:text-blue-300 font-bold hover:underline group">
                  Contact Us 
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </FadeIn>
            </div>
            
            <div className="lg:w-1/2 w-full h-[500px]">
              <FadeIn delay={0.3} direction="right" className="h-full">
                <div className="h-full bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl relative group">
                  <div className="absolute inset-0 bg-fbcc-navy/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10"></div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3852.2858372378473!2d120.66049800949149!3d15.08756708539788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f127206b9a91%3A0x5119e7050c2f4712!2sFIRST%20BAPTIST%20CHURCH%20OF%20CABALANTIAN%2C%20INC.!5e0!3m2!1sen!2sph!4v1789542999977!5m2!1sen!2sph" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                    className="filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
