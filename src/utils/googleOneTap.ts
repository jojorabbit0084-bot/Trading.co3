// src/utils/googleOneTap.ts

// This function will be called by Google Identity Services when One Tap sign-in is successful.
// It dispatches a custom event with the ID token.
(window as any).handleGoogleSignIn = (response: any) => {
  if (response.credential) {
    const event = new CustomEvent('googleOneTapCredential', {
      detail: { credential: response.credential },
    });
    window.dispatchEvent(event);
  } else {
    console.error('Google One Tap: No credential found in response', response);
  }
};
