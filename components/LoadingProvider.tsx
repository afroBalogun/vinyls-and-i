"use client"

import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isFinished, setIsFinished] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    // const pathname = usePathname();

    // useEffect(() => {

    //     // setIsFinished(false);
    //     // setShowLoader(true);
    // }, [pathname]);

    const handleComplete = () => {
        setIsFinished(true);
        setTimeout(() => setShowLoader(false), 1000); 
    };

    return (
        <>
            {showLoader && (
                <LoadingScreen
                    isFinished={isFinished} 
                    onComplete={handleComplete} 
                />
            )}

            <div className={isFinished ? "opacity-100" : "opacity-0"}>
                {children}
            </div>
        </>
    );
}