import background from './assets/mainbg.gif'
import { Footer, Window } from './components';
import Game from './pages/Game';
import { useContext } from 'react';
import { appContext } from './context/AppContext';

const Desktop = () => {
    const { startGame, isFooterVisible } = useContext(appContext);

    return (
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
    )
}

export default Desktop;
