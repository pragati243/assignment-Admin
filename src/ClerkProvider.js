

import React from 'react';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import App from './App'; // Ensure this import path is correct

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk publishable key. Please check your .env file and ensure REACT_APP_CLERK_PUBLISHABLE_KEY is set.');
}

const ClerkProviderWithRouting = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <App />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
};

export default ClerkProviderWithRouting;

