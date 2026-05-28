/**
 * LOGIXLOOPS — Analytics Abstraction Layer
 * 
 * Hydration-safe, non-blocking telemetry abstraction.
 * Prepares the architecture for Vercel Web Vitals, Google Analytics, or PostHog
 * without coupling the platform to a specific vendor.
 */

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Tracks a generic event (e.g., button clicks, interactions)
 * @param {string} eventName 
 * @param {object} properties 
 */
export const trackEvent = (eventName, properties = {}) => {
  // Ensure we are in a browser environment to prevent hydration mismatch
  if (typeof window === 'undefined') return;

  if (!isProduction) {
    // Non-blocking console output for staging/development
    console.debug(`[Analytics Event]: ${eventName}`, properties);
    return;
  }

  // TODO: Inject specific vendor tracking (GA/Vercel/PostHog) here.
  // Example: window.gtag('event', eventName, properties);
};

/**
 * Tracks a conversion metric (e.g., Lead form submission)
 * @param {string} conversionName 
 * @param {object} data 
 */
export const trackConversion = (conversionName, data = {}) => {
  if (typeof window === 'undefined') return;

  if (!isProduction) {
    console.info(`[Analytics Conversion]: ${conversionName}`, data);
    return;
  }

  // TODO: Inject specific vendor tracking (GA/Vercel/PostHog) here.
};
