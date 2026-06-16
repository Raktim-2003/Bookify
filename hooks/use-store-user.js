import { useUser } from "@clerk/react";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function useStoreUser() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState(null);
  const storeUser = useMutation(api.users.store);
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // If the user is not logged in don't do anything
    if (!isAuthenticated) {
      return;
    }
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    let cancelled = false;
    async function createUser() {
      const id = await storeUser();
      if (!cancelled && isAuthenticated) {
        setUserId(id);
      }
    }
    createUser();
    // Avoid calling setState after unmount by marking cancelled on cleanup.
    // Do not unconditionally clear `userId` here; instead clear it when
    // the user actually logs out in a dedicated effect below.
    return () => {
      cancelled = true;
    };
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated, storeUser, user?.id]);

  // Clear local `userId` only when the user logs out.
  useEffect(() => {
    if (!isAuthenticated) {
      setUserId(null);
    }
  }, [isAuthenticated]);
  // Combine the local state with the state from context
  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };
}
