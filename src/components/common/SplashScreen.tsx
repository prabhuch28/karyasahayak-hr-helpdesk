import React, { useEffect, useState } from 'react';
import { HelpCircle, Sparkles, Users, Zap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    'Initializing KaryaSahayak...',
    'Loading your workspace...',
    'Connecting to HR services...',
    'Almost ready!'
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textTimer = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center z-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-32 h-32 bg-white/15 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="text-center z-10 max-w-md mx-auto px-6">
        {/* Logo Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-2xl animate-bounce">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </div>
          </div>
        </div>

        {/* App Name with Animation */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-2 tracking-tight animate-fade-in">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Karya
            </span>
            <span className="text-white">Sahayak</span>
          </h1>
          <p className="text-white/90 text-xl font-light animate-slide-up">
            Your Smart HR Companion
          </p>
          <p className="text-white/70 text-sm mt-2 animate-slide-up delay-200">
            Empowering employees with intelligent support
          </p>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="flex flex-col items-center animate-fade-in delay-300">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/80 text-xs">Team Support</span>
          </div>
          <div className="flex flex-col items-center animate-fade-in delay-500">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/80 text-xs">Quick Response</span>
          </div>
          <div className="flex flex-col items-center animate-fade-in delay-700">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/80 text-xs">Smart Help</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-white/70 text-xs mt-2">
            <span>0%</span>
            <span className="font-medium">{progress}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="h-6">
          <p className="text-white/90 text-sm font-medium animate-pulse">
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Floating Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;