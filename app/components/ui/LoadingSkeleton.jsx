export const LoadingSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-12 bg-gray-800 rounded w-3/4"></div>
      <div className="h-4 bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-800 rounded w-5/6"></div>
      
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-8 bg-gray-800 rounded w-1/2"></div>
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-4/5"></div>
        </div>
      ))}
    </div>
  );
};