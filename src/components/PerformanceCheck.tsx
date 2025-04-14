import React, { useState, useEffect } from 'react';
import { CheckCircle2, Wifi, Camera, Mic, Monitor } from 'lucide-react';

interface PerformanceCheckProps {
  onComplete: () => void;
}

export default function PerformanceCheck({ onComplete }: PerformanceCheckProps) {
  const [currentCheck, setCurrentCheck] = useState(0);
  const checks = [
    { name: 'Internet Connection', icon: Wifi },
    { name: 'Camera Access', icon: Camera },
    { name: 'Microphone Access', icon: Mic },
    { name: 'Screen Sharing Capability', icon: Monitor },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCheck((prev) => {
        if (prev === checks.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          System Performance Check
        </h2>
        <div className="space-y-4">
          {checks.map((check, index) => {
            const Icon = check.icon;
            const isChecking = index === currentCheck;
            const isComplete = index < currentCheck;

            return (
              <div
                key={check.name}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  isChecking
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : isComplete
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-6 h-6 ${
                      isChecking
                        ? 'text-blue-500'
                        : isComplete
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }`}
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {check.name}
                  </span>
                </div>
                {isComplete && (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                )}
                {isChecking && (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}