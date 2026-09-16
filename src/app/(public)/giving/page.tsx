import FadeIn from "@/components/FadeIn";

export default function GivingPage() {
  return (
    <div className="py-20 flex-1 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1} direction="up">
          <h2 className="text-sm font-bold tracking-widest uppercase text-fbcc-earth dark:text-emerald-400 mb-3">Partner With Us</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-fbcc-navy dark:text-fbcc-ocean mb-8">Support Our Mission</h1>
        </FadeIn>
        
        <FadeIn delay={0.2} direction="up">
          <div className="bg-gray-50 dark:bg-gray-900 p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-fbcc-ocean dark:text-blue-300 mx-auto mb-8">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-serif italic mb-6 leading-relaxed">
              "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." 
              <span className="block mt-4 text-base font-bold text-fbcc-ocean dark:text-blue-300 uppercase tracking-widest not-italic">— 2 Corinthians 9:7</span>
            </p>
            
            <div className="w-16 h-1 bg-gradient-to-r from-fbcc-ocean to-fbcc-earth mx-auto rounded-full mb-8"></div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
              Your donations directly fund our local outreach programs, church maintenance, and global mission efforts. 
              Thank you for partnering with First Baptist Church of Cabalantian. Information on how to give electronically will be provided soon.
            </p>
            
            <div className="inline-block bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold py-3 px-8 rounded-full">
              Donation Details Coming Soon
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
