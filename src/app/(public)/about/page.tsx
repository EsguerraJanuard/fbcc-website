import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-20 flex-1 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <FadeIn delay={0.1} direction="up">
            <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-2">Our History</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fbcc-navy dark:text-gray-100 mb-6">About Us</h1>
            
            <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border-l-4 border-fbcc-ocean mb-8 text-left">
              <p className="font-serif italic text-gray-700 dark:text-gray-300 mb-2 text-lg">
                "And I say also unto thee, That thou art Peter, and upon this rock I will build my church; and the gates of hell shall not prevail against it."
              </p>
              <p className="text-sm font-bold text-fbcc-ocean dark:text-blue-300 uppercase tracking-wider">— Matthew 16:18 (KJV)</p>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We are a Bible-believing congregation with a deep, resilient history. By God's grace, we have stood the test of time, proving that a true church is not made of concrete and steel, but of faithful hearts anchored in Christ.
            </p>
          </FadeIn>
        </div>

        {/* The Mount Pinatubo Story */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-1/2">
              <FadeIn delay={0.2} direction="left">
                <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Why Cabalantian, but located in Bulaon?
                </h3>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    A question we frequently receive is why we are named <strong>First Baptist Church of Cabalantian</strong> when our physical chapel is currently located in Bulaon, City of San Fernando. 
                  </p>
                  <p>
                    The answer lies in our rich and testing history. Our original chapel was founded and built in the heart of Cabalantian, Bacolor, Pampanga. It was our home, our sanctuary, and the birthplace of our ministry.
                  </p>
                  <p>
                    However, the catastrophic eruption of Mount Pinatubo changed everything. As massive lahar flows swept through the region, our beloved chapel in Bacolor was completely swallowed by the volcanic debris. We lost our building entirely to the earth.
                  </p>
                  <blockquote className="border-l-4 border-fbcc-earth pl-6 py-2 my-8 font-serif italic text-xl text-fbcc-navy dark:text-fbcc-ocean font-medium">
                    "The lahar may have buried our building, but it could not bury His church."
                  </blockquote>
                  <p>
                    That disaster taught us a profound biblical truth: the building was lost, but the true church—the body of believers—remained unshakeable. We eventually relocated and rebuilt here in Bulaon, carrying the name of our roots as a testimony of God's sustaining grace and protection.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:w-1/2 w-full h-full">
              <FadeIn delay={0.3} direction="right" className="h-full">
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-fbcc-navy/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                  {/* Using a highly atmospheric placeholder image of a landscape/mountain/ash/church */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596700557431-15f91e847cd8?q=80&w=1600&auto=format&fit=crop')" }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4 italic">A reminder of God's faithfulness through the hardest trials.</p>
              </FadeIn>
            </div>
            
          </div>
        </div>

        {/* Our Pastoral Leadership */}
        <div className="mt-24">
          <FadeIn delay={0.2} direction="up">
            <div className="text-center mb-12">
              <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-ocean dark:text-blue-300 mb-2">Our Shepherds</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100">Pastoral Leadership</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Senior Pastor */}
            <FadeIn delay={0.2} direction="up">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center h-full group">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 mb-6 overflow-hidden border-4 border-white dark:border-gray-950 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/imgs/pastor joel sariego.jpg')" }}
                  ></div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Joel P. Sariego</h4>
                <p className="text-fbcc-ocean dark:text-blue-300 font-medium tracking-wide text-sm uppercase mb-4">Senior Pastor</p>
                <a href="https://www.facebook.com/joelsariego.bbip" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook Profile">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </FadeIn>

            {/* Assistant Pastor */}
            <FadeIn delay={0.3} direction="up">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center h-full group">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 mb-6 overflow-hidden border-4 border-white dark:border-gray-950 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/imgs/pastor salvador baluyut.jpg')" }}
                  ></div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Salvador B. Baluyut</h4>
                <p className="text-fbcc-earth dark:text-emerald-400 font-medium tracking-wide text-sm uppercase mb-4">Assistant Pastor</p>
                <a href="https://www.facebook.com/salvador.baluyut" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook Profile">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </FadeIn>

            {/* Youth Pastor */}
            <FadeIn delay={0.4} direction="up">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center h-full group">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 mb-6 overflow-hidden border-4 border-white dark:border-gray-950 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Jehoshua P. Sariego</h4>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium tracking-wide text-sm uppercase mb-4">Youth Pastor</p>
                <a href="https://www.facebook.com/jehokun15" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook Profile">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

      </div>
    </div>
  );
}
