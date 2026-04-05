import React, { useState, useContext } from 'react';
import bg from '../assets/gamebg.gif';
import GameHeader from '../components/game/GameHeader';
import ChatWindow from '../components/game/ChatWindow';
import GameSidebar from '../components/game/GameSidebar';
import GameMenu from '../components/GameMenu';
import { useGameState } from '../hooks/useGameState';
import { appContext } from '../context/AppContext';

const Game = () => {
    const { setStartGame, language, currentTime } = useContext(appContext);
    const [fontSize, setFontSize] = useState(24);

    const {
        chatLog,
        textArea, setTextArea,
        isLoading,
        image,
        isGeneratedImage,
        isImageActive, setIsImageActive,
        saveGame,
        addNewMessage,
        prevMessage,
        fetchImage,
        error
    } = useGameState();

    const quitGame = () => {
        saveGame().then(() => {
            setStartGame(false);
        });
    };

    const returnToMenu = () => {
        setStartGame(false);
    };

    return (
        <section className="w-full h-full xl:px-6">
            <div className="p-1 lg:p-4 pb-2 h-full w-full">
                <div className="border-container w-full flex flex-col h-full">
                    <GameHeader 
                        currentTime={currentTime}
                        fontSize={fontSize}
                        changeFontSize={setFontSize}
                        quitGame={quitGame}
                        returnToMenu={returnToMenu}
                    />
                    
                    <div className="w-full relative h-full">
                        <img src={bg} alt="" className="absolute top-0 left-0 object-cover w-full h-full" />
                        <div className="relative top-0 left-0 z-10">
                            <div className="flex flex-col h-full">
                                <div className="flex max-h-[72vh] md:min-h-[64vh] md:max-h-[64vh] lg:min-h-[65vh] lg:max-h-[65vh]">
                                    <ChatWindow 
                                        chatLog={chatLog} 
                                        isLoading={isLoading} 
                                        fontSize={fontSize} 
                                        error={error}
                                    />
                                    <GameSidebar 
                                        isImageActive={isImageActive}
                                        setIsImageActive={setIsImageActive}
                                        isGeneratedImage={isGeneratedImage}
                                        image={image}
                                    />
                                </div>
                                <GameMenu
                                    textArea={textArea}
                                    setTextArea={setTextArea}
                                    addNewMessage={addNewMessage}
                                    prevMessage={prevMessage}
                                    isLoading={isLoading}
                                    fontSize={fontSize}
                                    setFontSize={setFontSize}
                                    fetchImage={fetchImage}
                                    language={language}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Game;
