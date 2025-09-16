export default function LoadingSpinner({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-4',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-solid border-blue-600 border-r-transparent`}
      ></div>
      <p className="mt-2 text-gray-600">Loading...</p>
    </div>
  );
}