import {useState, useEffect} from 'react'

import { appContext } from '../Desktop'
import { useContext } from 'react'

const NewGame = () => {
  const [signCounter, setSignCounter] = useState(300)
  const [LANG, setLANG] = useState({});
  
  const { language, prompt, setPrompt, setStartGame } = useContext(appContext);

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

    const handleChange = (e) => {
        console.log(String(e.target.value).length)
        if (String(e.target.value).length <= 300){
            setPrompt(e.target.value)
            setSignCounter(300 - String(e.target.value).length)
        }
    }

    const newGame = (e) => {
      e.preventDefault()
      setStartGame(true)
    }
  return (
    <form className='w-full h-full flex flex-col items-center justify-center gap-4' onSubmit={newGame}>
      <h2 className='text-3xl text-center'>{LANG.newGameTitle}</h2>
          <div className="relative top-0 left-0 w-[90%] h-[50%]">
            <div className="absolute bottom-0 right-[10px] text-2xl">{signCounter}</div>
              <textarea value={prompt} onChange={handleChange} type="text" className='border-container w-full h-full  bg-[#F6EFDF] text-2xl p-2' placeholder='Type here...'/>
          </div>
          <button type='submit' className=' w-[300px] sm:w-[350px] text-4xl py-2'>Start game</button>
    </form>
  )
}

export default NewGame
