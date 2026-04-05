import React from 'react';
import redpetal from '../../assets/red_petal.png';
import placeholderImg from '../../assets/image.jpg';

const GameSidebar = ({ isImageActive, setIsImageActive, isGeneratedImage, image }) => {
    if (!isImageActive) return null;

    return (
        <div 
            className="p-1 lg:p-2 fixed lg:top-0 top-[70px] right-0 w-[170px] lg:w-auto lg:relative lg:block prev-game cursor-pointer" 
            onClick={() => setIsImageActive(false)}
        >
            <img 
                src={redpetal} 
                alt="" 
                className='fixed z-10 w-[90px] lg:w-[110px] right-[-50px] lg:right-[-50px] top-[280px] lg:top-[270px] rotate-[-70deg]' 
            />
            <div className="border-container h-full p-4">
                {isGeneratedImage ? (
                    <img src={`data:image/png;base64,${image.photo}`} alt="Generated Scene" className="border w-full h-full object-cover" />
                ) : (
                    <img src={placeholderImg} alt="Placeholder Scene" className="border w-full h-full object-cover" />
                )}
            </div>
        </div>
    );
};

export default GameSidebar;
