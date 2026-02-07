import { cn } from '@/lib/utils/formatters';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  colorClass?: string;
}

export function ProgressBar({ 
  value, 
  max, 
  label, 
  showPercentage = true, 
  className,
  colorClass = "bg-blue-500"
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Determine color based on percentage if not overridden
  const getColor = () => {
    if (colorClass !== "bg-blue-500") return colorClass;
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const finalColor = getColor();

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-500">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className={cn("h-2.5 rounded-full transition-all duration-500", finalColor)} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
