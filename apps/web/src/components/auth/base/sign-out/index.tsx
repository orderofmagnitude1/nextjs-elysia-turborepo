"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";

export default function SignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.removeQueries();
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }, [router, queryClient]);
  return null;
}
