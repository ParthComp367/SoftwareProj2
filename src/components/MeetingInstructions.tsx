import React from 'react';
import { Shield, MonitorUp, Mic, Camera } from 'lucide-react';

interface MeetingInstructionsProps {
  onAccept: () => void;
}

export default function MeetingInstructions({ onAccept }: MeetingInstructionsProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Meeting Instructions & Consent
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Camera className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Camera Usage</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your camera will be enabled by default. You can toggle it during the meeting.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Mic className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Microphone Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your microphone will be enabled. You can mute/unmute as needed.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MonitorUp className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Screen Sharing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You may be asked to share your screen during the interview. This is optional and requires your explicit consent.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Privacy & Recording</h3>
              <p className="text-gray-600 dark:text-gray-300">
                The meeting may be recorded with your consent. You will be notified before any recording starts.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onAccept}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              I Understand & Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}