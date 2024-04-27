import {useState, useEffect} from 'react'
import background from './assets/mainbg.gif'
import { Footer, Window } from './components';
import Game from './pages/Game';
import { format, parse, isDate } from 'date-fns';
import { createContext } from 'react';

export const appContext = createContext(null);

const Desktop = () => {
    const [language, setLanguage] = useState("ENG")
    const [startGame, setStartGame] = useState(false)
    const [prompt, setPrompt] = useState('')
    //to check if this is nesessary to load chatlog in the game
    const [isThisPreviousGame, setIsThisPreviousGame] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState('');

    //is footer enabled
    const [isFooterVisible, setIsFooterVisible] = useState(true)

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Update the current time every second
            setCurrentTime(format(new Date(), 'h:mm a'));
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <appContext.Provider value={{ language, setLanguage, startGame, setStartGame, prompt, setPrompt, isThisPreviousGame, setIsThisPreviousGame, selectedDate, setSelectedDate, currentTime, setCurrentTime, isFooterVisible, setIsFooterVisible }}>
       
    <div className='w-[100vw] h-[100vh] relative top-0 left-0 text-txt'>
        <img src={background} alt="" className=' w-full h-full object-cover absolute top-0 left-0'/>
        <main className='h-full flex flex-col relative top-0 left-0 z-50'>
              {!startGame ? (
                  <Window/>
              ) : (
                      <Game/>
                )}
                {isFooterVisible && (
                    <Footer/>
                    )}
        </main>
            </div>
            </appContext.Provider>
)
}

export default Desktop
