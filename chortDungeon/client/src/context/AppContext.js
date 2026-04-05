import React, { createContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

export const appContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [language, setLanguage] = useState("ENG");
    const [startGame, setStartGame] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [isThisPreviousGame, setIsThisPreviousGame] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState('');
    const [isFooterVisible, setIsFooterVisible] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Update the current time every second
            setCurrentTime(format(new Date(), 'h:mm a'));
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <appContext.Provider value={{
            language, setLanguage,
            startGame, setStartGame,
            prompt, setPrompt,
            isThisPreviousGame, setIsThisPreviousGame,
            selectedDate, setSelectedDate,
            currentTime, setCurrentTime,
            isFooterVisible, setIsFooterVisible
        }}>
            {children}
        </appContext.Provider>
    );
};
