
'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white text-primary rounded-lg p-4 w-24 h-24 justify-center shadow-lg">
        <span className="text-3xl font-bold">{String(value).padStart(2, '0')}</span>
        <span className="text-sm uppercase tracking-wider font-medium text-primary/80">{label}</span>
    </div>
);

export default function ConferenceCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) {
    return (
        <div className="flex items-center gap-4">
            <CountdownUnit value={0} label="Days" />
            <CountdownUnit value={0} label="Hours" />
            <CountdownUnit value={0} label="Minutes" />
            <CountdownUnit value={0} label="Seconds" />
        </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Minutes" />
        <CountdownUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
