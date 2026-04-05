import { useState, useEffect, useContext } from 'react';
import { checkAuth, fetchPreviousChatLog, createGame, fetchGPTResponse, generateImage } from '../services/api';
import { appContext } from '../context/AppContext';

export const useGameState = () => {
    const { prompt, language, isThisPreviousGame, setIsThisPreviousGame, setIsFooterVisible } = useContext(appContext);

    const langOfPrompt = () => {
        if (language === 'ENG')
            return [
                { "role": "user", "content": `You are a game bot that presents hypothetical and fantastical scenarios. I am a user cast in the role of the main character in the story you create. ${prompt}. You will then provide information about ongoing events, and I will react by describing my desired actions. You should continue the game without interruptions, regardless of my responses. If you understand this, just reply 'OK' and wait until I say 'start' before you begin.` },
                { "role": "assistant", "content": "OK, I understand the rules of the game. When you're ready, say 'start,' and we'll embark on an adventure in a fantastic magical world as a ninja with the ability to burn everything you touch." },
                { "role": "user", "content": "start" }
            ];
        if (language === 'PL')
            return [
                { "role": "user", "content": `Jesteś botem do gier, który przedstawia hipotetyczne i fantastyczne scenariusze. ${prompt}. Następnie dostarczysz informacje na temat trwających wydarzeń, a ja będę reagować, opisując moje pożądane działania. Powinieneś kontynuować grę bez przerw, bez względu na moje odpowiedzi. Jeśli to rozumiesz, po prostu odpowiedz 'OK' i poczekaj, aż powiem 'rozpocznij', zanim zaczniesz.` },
                { "role": "assistant", "content": "OK, rozumiem zasady gry. Kiedy będziesz gotów, powiedz 'rozpocznij', a zaczniemy przygodę w fantastycznym magicznym świecie jako ninja ze zdolnością spalania wszystkiego, czego dotkniesz." },
                { "role": "user", "content": "rozpocznij" }
            ];
        if (language === 'UA')
            return [
                { "role": "user", "content": "Ти - бот для ігор, який представляє гіпотетичні та фантастичні сценарії. Я - користувач, узятий на роль головного героя в історії, яку ти створюєш. Потім ти надаватимеш інформацію щодо триваючих подій, і я буду реагувати, описуючи свої бажані дії. Ти повинен продовжувати гру без перерв, незалежно від моїх відповідей. Якщо ти це розумієш, просто відповідь 'OK' і зачекай, доки я скажу 'start', перш ніж починати." },
                { "role": "assistant", "content": "OK, я розумію правила гри. Коли ти будеш готовий, скажи 'start', і ми вирушимо в пригоду в фантастичний магічний світ як ніндзя з здатністю палити все, до чого торкнешся." },
                { "role": "user", "content": "start" }
            ];
        return [];
    };

    const [chatLog, setChatLog] = useState(langOfPrompt());
    const [userId, setUserId] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [startIndex, setStartIndex] = useState(1);
    const [textArea, setTextArea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [image, setImage] = useState("");
    const [isGeneratedImage, setIsGeneratedImage] = useState(false);
    const [isImageActive, setIsImageActive] = useState(true);

    useEffect(() => {
        setIsFooterVisible(false);
        checkAuth()
            .then((data) => {
                setUserId(data);
                if (isThisPreviousGame) {
                    loadPreviousChatLog(data);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoggedIn(false);
            });
        // eslint-disable-next-line
    }, []);

    const loadPreviousChatLog = async (uid) => {
        try {
            const data = await fetchPreviousChatLog(uid, prompt);
            const newChatLog = data.chatLog.map(obj => {
                const { _id, ...rest } = obj;
                return rest;
            });
            setChatLog(newChatLog);
            setIsThisPreviousGame(false);
        } catch (error) {
            console.error('Error fetching chat log:', error.message);
        }
    };

    const saveGame = async () => {
        if (isLoggedIn && !isThisPreviousGame && userId) {
            try {
                await createGame(prompt, chatLog, userId);
            } catch (error) {
                console.error('Error creating game:', error);
            }
        }
    };

    // Auto-save the game whenever chatLog or userId changes
    useEffect(() => {
        if (isLoggedIn && !isThisPreviousGame && userId) {
            saveGame();
        }
        // eslint-disable-next-line
    }, [chatLog, userId, isLoggedIn, isThisPreviousGame]);

    const fetchData = async () => {
        setTextArea('');
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchGPTResponse(chatLog);
            setChatLog((prev) => [...prev, data]);
        } catch (err) {
            console.error('Error fetching GPT:', err);
            setError(`Failed to connect to GPT: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (startIndex === 1 && !isThisPreviousGame) {
            fetchData().finally(() => {
                setStartIndex(0);
            });
        }
        // eslint-disable-next-line
    }, [chatLog, startIndex, isThisPreviousGame]);

    const fetchImageForCurrentLog = async () => {
        setError(null);
        try {
            const data = await generateImage(chatLog[chatLog.length - 1].content);
            setIsGeneratedImage(true);
            setImage(data);
            setIsImageActive(true);
        } catch (err) {
            console.error('Error generating image:', err);
            setError(`Failed to generate image: ${err.message}`);
        }
    };

    const addNewMessage = (e) => {
        if(e) e.preventDefault();
        setChatLog((prev) => [...prev, { role: "user", content: textArea }]);
        setStartIndex(1);
        setTextArea('');
    };

    const prevMessage = () => {
        if (!isLoading && chatLog.length > 0) {
            setChatLog(chatLog.slice(0, -1));
        }
    };

    return {
        chatLog,
        userId,
        isLoggedIn,
        textArea, setTextArea,
        isLoading,
        image, setImage,
        isGeneratedImage,
        isImageActive, setIsImageActive,
        saveGame,
        addNewMessage,
        prevMessage,
        fetchImage: fetchImageForCurrentLog,
        error
    };
};
