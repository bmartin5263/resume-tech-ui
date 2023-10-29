import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLog from "./useLog";

export default function useAuth(shouldRedirect) {
    const log = useLog("useAuth");
    const session = useSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (session.data === null) {
            log("session == null")
            if (shouldRedirect && router.route !== '/login') {
                router.replace('/login');
            }
            setIsAuthenticated(false);
        } else if (session.data !== undefined) {
            log("session == logged in!!")
            if (router.route === '/login') {
                router.replace('/');
            }
            setIsAuthenticated(true);
        }
    }, [session.data]);

    return isAuthenticated;
}