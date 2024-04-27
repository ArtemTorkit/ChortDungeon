import {useState, useEffect} from 'react'
import logo from '../assets/logo.svg'
import cross from '../assets/cross.svg'
import Welcome from './Welcome'
import Oauth from './Oauth'
import PreviousGames from './PreviousGames'
import NewGame from './NewGame'
import petal from '../assets/golden_petal.png'

import { appContext } from '../Desktop'
import { useContext } from 'react'

const Window = () => {
    const [activePage, setActivePage] = useState(0)
    const [userId, setUserId] = useState("")

    const { language, prompt, setPrompt, setStartGame, setIsThisPreviousGame, currentTime, setIsFooterVisible } = useContext(appContext)

    useEffect(() => {
        //show footer
        setIsFooterVisible(true)

        console.log('--checking for succesfull login--')
        fetch('http://localhost:5000/auth/cabage', {
            method: 'GET', // or any other HTTP method
            credentials: 'include', // Allow credentials (cookies) to be sent with the request
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserId(data);
            })
            .catch((error) => {
                console.log(error)
            });
        setIsThisPreviousGame(false)
    }, [])

  return (
    <section className='basis-[93%]'>
        <div className="w-full h-full flex justify-center items-center p-4">
              <div className="border-container flex flex-col justify-start w-[100%] sm:w-[650px] h-[490px] ">
                  <header className="w-full border-bottom flex justify-between sm:px-4">
                      <div className="flex items-center justify-start gap-2">
                      <div className="side-border-container max-w-[300px] text-center py-[5px] px-[5px]">
                          <div className="w-full h-full">
                              <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative px-3">
                                      <div className="background-net w-full h-full"></div>
                                      <img src={petal} alt="" className='absolute z-10 w-[100px] lg:w-[120px] top-[-60px] lg:top-[-70px]'/>
                                  <div className="border net-top button-element" onClick={e=>setActivePage(0)}>
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
                      <div className="side-border-container max-w-[300px] text-center py-[5px] px-[5px]">
                          <div className="w-full h-full">
                              <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative px-3">
                                  <div className="background-net w-full h-full"></div>
                                  <div className="border net-top p-2">
                                      <img src={cross} alt="Chort is watching!" className='w-[25px] sm:w-[40px]' />
                                  </div>
                              </div>
                          </div>
                          </div>
                  </header>
                    <nav className="border-bottom px-4  flex justify-start gap-3 text-xl sm:text-lg">
                        <p className='block cursor-pointer hover:underline' onClick={e=>setActivePage(1)} >Register/Login</p>
                        <p className='block cursor-pointer hover:underline' onClick={e => setActivePage(2)}>Play</p>
                    </nav>
                    {activePage == 0 && (
                        <div className="h-full w-full">
                          <Welcome
                              userId={userId}
                              setActivePage={setActivePage}
                          />
                        </div>
                    )}
                    {activePage == 1 && (
                        <div className="h-full w-full">
                            <Oauth />
                        </div>
                    )}
                    {activePage == 2 && (
                        <div className="h-full w-full">
                          <NewGame
                              activePage={activePage}
                              setActivePage={setActivePage}
                          />
                        </div>
                    )}
                    {activePage == 3 && (
                        <div className="h-full w-full">
                            <PreviousGames/>
                        </div>
                    )}
            </div>
            </div>
    </section>
  )
}

export default Window
