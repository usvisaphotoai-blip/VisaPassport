"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fakeSalesData, products } from "@/lib/fakeSalesData";

export default function RecentSaleNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({
    name: "",
    location: "",
    product: "",
    timeAgo: "",
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNext = (delay: number) => {
      timeoutId = setTimeout(() => {
        const randomPerson = fakeSalesData[Math.floor(Math.random() * fakeSalesData.length)];
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        
        // Random time between 1 min to 24 hours
        const isMinutes = Math.random() > 0.5;
        let timeAgo = "";
        if (isMinutes) {
          const mins = Math.floor(Math.random() * 59) + 1;
          timeAgo = `${mins} minute${mins > 1 ? 's' : ''} ago`;
        } else {
          const hours = Math.floor(Math.random() * 24) + 1;
          timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
        
        setNotification({
          name: randomPerson.name,
          location: randomPerson.location,
          product: randomProduct,
          timeAgo,
        });
        
        setIsVisible(true);
        
        // Hide after 6 seconds, then schedule next after 10-30 seconds
        setTimeout(() => {
          setIsVisible(false);
          const nextDelay = Math.floor(Math.random() * 20000) + 10000;
          scheduleNext(nextDelay);
        }, 6000);
      }, delay);
    };

    // Start first notification after 3 seconds
    scheduleNext(3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex items-center bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-3 pr-5 sm:p-4 sm:pr-8 border border-gray-100/50 max-w-[calc(100vw-2rem)] sm:max-w-sm pointer-events-none"
          >
            <div className="flex-shrink-0 mr-3 sm:mr-4">
              <svg className="w-9 h-9 sm:w-[46px] sm:h-[46px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 38C26.6274 38 32 32.6274 32 26C32 21 28 17 25 14C23.5 12.5 24 10 24 10C24 10 23 12 20 14C17 16 14 18.5 12 21.5C10.5 23.75 10 25.5 10 27C10 33.0751 14.4772 38 20 38Z" fill="#FF9500"/>
                <path d="M21 34C24 34 26 31 26 28C26 25 23 23 21 21C20.25 20.25 20 19 20 19C20 19 19 20.5 18 21.5C16.5 23 15 25 15 27C15 30.866 17.6863 34 21 34Z" fill="#FFCC00"/>
                <circle cx="12" cy="10" r="1.5" fill="#FF9500" />
                <circle cx="28" cy="14" r="1" fill="#FFCC00" />
                <circle cx="22" cy="6" r="1.5" fill="#FFCC00" />
              </svg>
            </div>
            <div className="flex flex-col text-[12px] sm:text-[14px] leading-tight">
              <span className="font-semibold text-gray-800 mb-0.5 sm:mb-1">
                {notification.name} from {notification.location}
              </span>
              <span className="text-gray-500 mb-0.5 sm:mb-1 font-medium">
                {notification.product}
              </span>
              <span className="text-gray-400 text-[10px] sm:text-xs">
                {notification.timeAgo}
              </span>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
