import React from 'react';
import loadingIcon from '../../assets/loading.webp';

const ChatWindow = ({ chatLog, isLoading, fontSize, error }) => {
    const dynamicFontSize = {
        fontSize: `${fontSize}px`,
    };

    return (
        <div className="scroll-container w-full flex flex-col px-4 mb-4">
            {chatLog.slice(3).map((message, index) => (
                <div
                    style={dynamicFontSize}
                    key={index}
                    className={`border-container p-2 max-w-[78%] pt-2 mt-2 ${
                        message.role === "assistant" ? 'self-start message-ai' : 'self-end'
                    }`}
                >
                    {message.content}
                </div>
            ))}
            {isLoading && (
                <div className="border-container p-2 max-w-[75%] pt-2 mt-2 self-start">
                    <img src={loadingIcon} alt="Loading..." className='w-[40px]' />
                </div>
            )}
            {error && (
                <div className="border border-red-500 bg-red-900 bg-opacity-30 text-red-500 p-3 max-w-[78%] pt-2 mt-2 self-start">
                    <p className="text-xl font-bold">Error Processing Request</p>
                    <p className="text-lg">{error}</p>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
