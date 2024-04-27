import {useState} from 'react'
import logo from '../assets/logo.svg'
import wifi from '../assets/wifi.svg'
import volume from '../assets/volume.svg'
import batery from '../assets/baterry.svg'
import petal from '../assets/red_petal.png'
import { format } from 'date-fns';

import { appContext } from '../Desktop'
import { useContext } from 'react'

const Footer = () => {

    const { language, setLanguage, selectedDate, currentTime } = useContext(appContext)

    const changeLanguage = () => {
        console.log('sdfd')
        if(language == "ENG") {
            setLanguage("UA")
        }else if (language == 'UA') {
            setLanguage('PL')
        } else if (language == 'PL') {
            setLanguage('ENG')
        }
    }

    return (
            <footer className=' basis-[7%] border-container sm:px-[15px] flex justify-between relative'>
          <img src={petal} alt="" className='absolute top-[-30px] sm:top-[-38px] left-[100px] w-[45px] sm:w-[60px] z-40 rotate-90'/>
          <div className="side-border-container text-center py-[5px] px-[5px] ">
              <div className="w-full h-full">
                  <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative px-2">
                      <div className="background-net w-full h-full"></div>
                      <div className="border net-top">
                          <img className='max-w-[44px] sm:max-w-[60px] ' src={logo} alt="Chort is watching!" />
                      </div>
                      <div className="border text-2xl net-top">
                          <p className='sm:text-3xl block px-2 sm:px-4 py-2 sm:py-3'>CHSIM.exe</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="absolute left-[50%] translate-x-[-50%] top-0 h-full side-border-container w-[300px] text-center py-[5px] px-[5px] hidden lg:block">
              <div className="w-full h-full">
                  <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative">
                      <div className="background-net w-full h-full"></div>
                  </div>
              </div>
          </div>
          <div className="side-border-container max-w-[500px] text-center py-[5px] px-[5px]">
              <div className="w-full h-full">
                  <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative px-2">
                      <div className="background-net w-full h-full"></div>
                      <div className="border net-top flex items-center gap-2  px-2 sm:px-4 h-30px h-[92%]">
                          <div className='block text-[19px] sm:text-[32px] sm:mr-6 cursor-pointer' onClick={changeLanguage}>{language}</div>
                          <img src={wifi} alt="" className='hidden sm:block' />
                          <img src={volume} alt="Chort is watching!" className='hidden sm:block' />
                          <img src={batery} alt="Chort is watching!" className='hidden sm:block'/>
                      </div>
                      <div className="border net-top h-[92%] flex flex-col items-end justify-center px-4 py-2 leading-5 hidden sm:block">
                          <p className='block text-[27px]'>{currentTime}</p>
                          <p className='block text-[25px]'>{format(selectedDate, 'MM/dd/yyyy')}</p>
                      </div>
                  </div>
              </div>
          </div>
        </footer>
  )
}

export default Footer
