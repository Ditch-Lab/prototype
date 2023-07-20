import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'

const auth = getAuth()
// TODO: Deprecate this hook if we want to continue using magic link for the demo
export function useAuthentication () {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
      } else {
        // User is signed out
        setUser(undefined)
      }
    })

    return unsubscribeFromAuthStatuChanged
  }, [])

  return {
    user
  }
}
