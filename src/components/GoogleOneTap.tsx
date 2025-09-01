'use client'

import { useState, useEffect, useCallback } from 'react' // Import useEffect, useState, and useCallback
import Script from 'next/script'
import { createClient } from '@/utils/supabase/client'
import type { accounts, CredentialResponse } from 'google-one-tap'
import { useRouter } from 'next/navigation'

declare const google: { accounts: accounts }

// generate nonce to use for google id token sign-in
const generateNonce = async (): Promise<string[]> => {
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
  const encoder = new TextEncoder()
  const encodedNonce = encoder.encode(nonce)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return [nonce, hashedNonce]
}

const OneTapComponent = () => {
  const supabase = createClient()
  const router = useRouter()
  const [nonce, setNonce] = useState<string | null>(null)
  const [hashedNonce, setHashedNonce] = useState<string | null>(null)
  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false)

  // Effect to generate nonce
  useEffect(() => {
    const setupNonce = async () => {
      // Ensure crypto.subtle is available before attempting to use it
      if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
        try {
          const [newNonce, newHashedNonce] = await generateNonce()
          setNonce(newNonce)
          setHashedNonce(newHashedNonce)
        } catch (error) {
          console.error('Error generating nonce:', error);
        }
      } else {
        console.warn('Web Crypto API (crypto.subtle) not available. Cannot generate nonce for Google One Tap.')
      }
    }
    setupNonce()
  }, [])

  // Callback for Google Identity Services initialization
  const handleGsiScriptLoad = useCallback(() => {
    setGsiScriptLoaded(true)
  }, [])

  // Effect to initialize Google One Tap after nonce is generated and GSI script is loaded
  useEffect(() => {
    if (nonce && hashedNonce && gsiScriptLoaded) {
      const setupOneTap = async () => {
        console.log('Initializing Google One Tap')
        console.log('Nonce: ', nonce, hashedNonce)

        // check if there's already an existing session before initializing the one-tap UI
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session', error)
        }
        if (data.session) {
          router.push('/')
          return
        }

        /* global google */
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!, // Assert that it's a string
          callback: async (response: CredentialResponse) => {
            try {
              // send id token returned in response.credential to supabase
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential,
                nonce,
              })

              if (error) throw error
              console.log('Session data: ', data)
              console.log('Successfully logged in with Google One Tap')

              // redirect to protected page
              router.push('/')
            } catch (error) {
              console.error('Error logging in with Google One Tap', error)
            }
          },
          nonce: hashedNonce,
          // with chrome's removal of third-party cookies, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
          use_fedcm_for_prompt: true, // Re-added as nonce issue was primary blocker
        })
        google.accounts.id.prompt() // Display the One Tap UI
      }
      setupOneTap();
    }
  }, [nonce, hashedNonce, gsiScriptLoaded, router, supabase])

  return <Script onReady={handleGsiScriptLoad} src="https://accounts.google.com/gsi/client" />
}

export default OneTapComponent
