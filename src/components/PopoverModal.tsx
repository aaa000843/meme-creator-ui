import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface PopoverModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  className?: { trigger?: clsx.ClassValue; modal?: clsx.ClassValue };
}

const PopoverModal: React.FC<PopoverModalProps> = ({
  trigger,
  children,
  placement = 'bottom',
  offset = 8,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        triggerRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Calculate position classes based on placement
  const getPositionClasses = () => {
    switch (placement) {
      case 'top':
        return `bottom-[calc(100%+${offset}px)]`;
      case 'bottom':
        return `top-[calc(100%+${offset}px)]`;
      case 'left':
        return `right-[calc(100%+${offset}px)] top-0`;
      case 'right':
        return `left-[calc(100%+${offset}px)] top-0`;
      default:
        return `top-[calc(100%+${offset}px)]`;
    }
  };

  return (
    <div className={cn('relative inline-block', className?.trigger)}>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={modalRef}
          className={`
            absolute z-50 min-w-[200px]
            bg-white
            border border-gray-200
            rounded-lg shadow-lg
            ${getPositionClasses()}
            ${className?.modal}
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default PopoverModal;
