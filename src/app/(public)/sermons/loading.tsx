export default function SermonsLoading() {
  return (
    <div className="py-20 flex-1 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section (Static, matches the new page perfectly) */}
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

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md flex flex-col h-full animate-pulse">
              <div className="p-8 flex-1 flex flex-col relative">
                
                {/* Date Skeleton */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                </div>
                
                {/* Title Skeleton */}
                <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4 mb-3"></div>
                <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2 mb-5"></div>
                
                {/* Preacher Skeleton */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                </div>
                
                {/* Transcript Skeleton */}
                <div className="space-y-3 mb-10 flex-1">
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
                </div>
                
                {/* Button Skeleton */}
                <div className="mt-auto pt-4">
                  <div className="h-14 bg-gray-100 dark:bg-gray-800 rounded-xl w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
