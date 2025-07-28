export const logInfo = (message, data = null) => {
    console.log(`[INFO] ${message}`, data || '');
  };
  
  export const logError = (message, error = null) => {
    console.error(`[ERROR] ${message}`, error || '');
  };
  
  export const logDebug = (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, data || '');
    }
  };
  