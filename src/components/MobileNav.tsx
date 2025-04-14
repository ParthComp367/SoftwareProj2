import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function MobileNav({ isOpen, onToggle, children }: MobileNavProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={onToggle} />
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-800 p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={onToggle}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}