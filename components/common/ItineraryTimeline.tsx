// components/common/ItineraryTimeline.tsx
import { ITineraryDay } from '@/lib/types/IBaseHajjPackage';

interface ItineraryTimelineProps {
  itinerary: ITineraryDay[];
}

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  return (
    <div className="space-y-4">
      {itinerary.map((day, index) => (
        <div key={index} className="relative pl-8 pb-6">
          {/* Timeline line */}
          {index < itinerary.length - 1 && (
            <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-green-200"></div>
          )}
          
          {/* Day circle */}
          <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center text-xs font-medium text-green-800">
            {index + 1}
          </div>
          
          {/* Content */}
          <div>
            <h3 className="font-medium text-lg">{day.day}: {day.title}</h3>
            <div 
              className="mt-2 text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: day.description }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}