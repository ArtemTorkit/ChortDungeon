import { useEffect, useState } from 'react'

import { useContext } from 'react';
import { appContext } from '../Desktop';

const Welcome = ({userId, setActivePage}) => {
    const [LANG, setLANG] = useState({});
    const { language } = useContext(appContext)
    useEffect(() => {
        const importLanguage = async () => {
            if (language === 'UA') {
                const module = await import('../constants');
                setLANG(module.UA);
            } else if (language === 'ENG') {
                const module = await import('../constants');
                setLANG(module.ENG);
            } else if (language === 'PL') {
                const module = await import('../constants');
                setLANG(module.PL);
            }
        };

        importLanguage();
    }, [language]);

  return (
      <div className='w-full h-full flex flex-col items-center justify-center gap-4 '>
          {userId == '' ? (
              <h1 className='text-[40px] sm:text-6xl max-w-[500px] text-center'>Welcome to Chort Dungeon!</h1>
              ) : (
                  <h1 className='text-[40px] sm:text-6xl max-w-[500px] text-center'>{LANG?.niceToSeeYou}</h1>
          )}
          <button className=" w-[300px] sm:w-[350px] text-4xl py-2" onClick={e => setActivePage(2)}>Start Game</button>
          {userId !== '' && (
              <button className=" w-[300px] sm:w-[350px] text-4xl py-2 " onClick={e => setActivePage(3)}>Previous games</button>
          )}
    </div>
  )
}

export default Welcome
