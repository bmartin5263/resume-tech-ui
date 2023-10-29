import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useLog from "../hooks/useLog";

function RefreshTokenHandler(props) {
    const session = useSession();
    const log = useLog("RefreshTokenHandler")

    useEffect(() => {
        if(!!session.data) {
            const expiresAt = session.data.expiresAt;
            const now = Date.now() / 1000;
            const timeRemaining = Math.round(expiresAt - now);
            const interval = timeRemaining > 0 ? timeRemaining : 0;
            log("Setting Interval to " + interval)
            props.setInterval(interval);
        }
    }, [session.data]);

    return null;
}

export default RefreshTokenHandler;