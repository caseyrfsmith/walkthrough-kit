import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing step navigation with URL hash support
 * 
 * Features:
 * - Current step state
 * - Next/previous navigation
 * - Deep linking via URL hash (#step-2)
 * - Callback when step changes
 */
export function useStepNavigation(
  totalSteps: number,
  initialStep: number = 0,
  onStepChange?: (stepIndex: number) => void
) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  
  // Initialize from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#step-')) {
      const stepNum = parseInt(hash.replace('#step-', ''), 10);
      if (!isNaN(stepNum) && stepNum > 0 && stepNum <= totalSteps) {
        setCurrentStep(stepNum - 1); // Convert to 0-indexed
      }
    }
  }, [totalSteps]);
  
  // Update URL hash when step changes
  useEffect(() => {
    const stepNum = currentStep + 1; // Convert to 1-indexed
    window.history.replaceState(null, '', `#step-${stepNum}`);
    
    // Call callback if provided
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);
  
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setCurrentStep(stepIndex);
    }
  }, [totalSteps]);
  
  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);
  
  const previousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);
  
  const canGoNext = currentStep < totalSteps - 1;
  const canGoPrevious = currentStep > 0;
  
  return {
    currentStep,
    goToStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
  };
}