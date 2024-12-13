export const AUTH_ERROR_CODES = {
  'auth/invalid-credential': 'Invalid email or password',
  'auth/user-not-found': 'No account found with this email',
  'auth/wrong-password': 'Incorrect password',
  'auth/email-already-in-use': 'An account with this email already exists',
  'auth/weak-password': 'Password should be at least 6 characters',
  'auth/invalid-email': 'Please enter a valid email address',
  'auth/network-request-failed': 'Network error. Please check your connection',
  'auth/too-many-requests': 'Too many attempts. Please try again later',
  'auth/user-disabled': 'This account has been disabled',
  'auth/operation-not-allowed': 'Operation not allowed',
  'auth/popup-closed-by-user': 'Sign in popup was closed',
} as const;

export type FirebaseAuthError = keyof typeof AUTH_ERROR_CODES;

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // Firebase errors contain the code in the message like "Firebase: Error (auth/invalid-credential)"
    const errorCode = error.message.includes('Firebase:') 
      ? error.message.split('(')[1]?.split(')')[0]
      : error.message;

    if (errorCode && errorCode in AUTH_ERROR_CODES) {
      return AUTH_ERROR_CODES[errorCode as FirebaseAuthError];
    }

    // If we can't extract a code but have an error message, use it
    return error.message;
  }
  return 'An unexpected error occurred';
};