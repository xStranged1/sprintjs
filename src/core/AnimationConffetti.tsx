import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use';

export const AnimationConfetti = () => {
    const { width, height } = useWindowSize();

    const [showConfetti, setShowConfetti] = useState(true);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFade(true);
        }, 6000);

        const endTimer = setTimeout(() => {
            setShowConfetti(false);
        }, 7000);

        return () => {
            clearTimeout(timer);
            clearTimeout(endTimer);
        };
    }, []);
    return (
        <>
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height * 2}
                    className={`transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}
                />
            )}
        </>

    )
}