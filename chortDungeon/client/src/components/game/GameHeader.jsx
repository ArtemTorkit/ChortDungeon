import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import cross from '../../assets/cross.svg';
import petal from '../../assets/golden_petal.png';
import settingsIcon from '../../assets/options.svg';
import arrow from '../../assets/arrow.svg';
import quit from '../../assets/quit.svg';

const GameHeader = ({
    currentTime,
    fontSize,
    changeFontSize,
    quitGame,
    returnToMenu
}) => {
    const [mobileSettings, setMobileSettings] = useState(false);
    const [showFontSize, setShowFontSize] = useState(false);

    const showMobileSettings = () => setMobileSettings(!mobileSettings);
    
    const handleSetFontSize = (size) => {
        changeFontSize(size);
        setShowFontSize(false);
    };

    return (
        <header className="w-full border-bottom flex justify-between sm:px-4">
            <div className="flex items-center justify-start gap-2">
                <div className="side-border-container max-w-[300px] text-center py-[5px] px-[5px]">
                    <div className="w-full h-full">
                        <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative px-3">
                            <div className="background-net w-full h-full"></div>
                            <img src={petal} alt="" className='absolute z-10 w-[100px] lg:w-[120px] top-[-60px] lg:top-[-70px]' />
                            <div className="border net-top button-element">
                                <img src={logo} alt="Chort is watching!" className='w-[45px] sm:w-[60px]' />
                            </div>
                            <div className="border text-2xl net-top">
                                <p className='text-xl block px-4 py-3 sm:text-3xl'>MENU.exe</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-4xl hidden sm:block">{currentTime}</div>
            </div>
            
            <div className="block sm:hidden border my-1 relative">
                <img src={settingsIcon} alt="" className='w-[50px] cursor-pointer' onClick={showMobileSettings} />
                {mobileSettings && (
                    <div className="absolute bottom-[-200px] w-[190px] right-0 border z-20 flex flex-col items-center p-2 gap-2 bg-black">
                        <div className="flex justify-between items-center w-full">
                            <p className='block text-2xl'>Sounds:</p>
                            <div className="border text-3xl p-1 self-end">OFF</div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className='block text-2xl'>Font size:</p>
                            <div className="flex">
                                <p className='block text-2xl border p-2'>{fontSize}</p>
                                <div className="border pt-5 prev-game relative cursor-pointer" onClick={() => setShowFontSize(!showFontSize)}>
                                    <img src={arrow} alt="" />
                                    {showFontSize && (
                                        <div className="absolute border p-2 flex flex-col gap-1 justify-center items-center bg-black">
                                            {[32, 26, 24, 22, 18, 16].map(size => (
                                                <p key={size} className='text-4xl cursor-pointer hover:text-5xl' onClick={() => handleSetFontSize(size)}>{size}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className='block text-3xl'>Quit</p>
                            <div className="block border prev-game p-2 cursor-pointer" onClick={quitGame}>
                                <img src={quit} alt="" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="side-border-container max-w-[300px] text-center py-[5px] px-[5px]">
                <div className="w-full h-full">
                    <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative px-3">
                        <div className="background-net w-full h-full"></div>
                        <div className="border net-top p-2 cursor-pointer" onClick={returnToMenu}>
                            <img src={cross} alt="Close" className='w-[25px] sm:w-[40px]' />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default GameHeader;
