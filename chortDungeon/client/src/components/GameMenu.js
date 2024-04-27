import {useState} from 'react'
import arrow from '../assets/arrow.svg'
import back from '../assets/back.svg'
import audio from './bruh.mp3'
import petro from './petro.mp3'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import microphone from '../assets/microphone.png'

import { appContext } from '../Desktop'
import { useContext } from 'react'

const GameMenu = ({ textArea, setTextArea, addNewMessage, prevMessage, isLoading, fontSize, setFontSize, fetchImage}) => {

    const { language } = useContext(appContext)

    const [showFontSize, setShowFontSize] = useState(false)
    const changeFontSize = (value) => {
        setFontSize(value)
        setShowFontSize(false)
    } 

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addNewMessage(event);
        }
    };
    
    //play bruh sound
    const bruhSound = () => {
        new Audio(audio).play()
    }
    const petroSound = () => {
        new Audio(petro).play()
    }


    //speech recognition
    const [isThereSpeechRecognition, setIsThereSpeechRecognition] = useState(language == 'UA' ? false : true) 
    const [speechActive, setSpeechActive] = useState(false) 
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

    const startListening = () => {
        let speechLanguage = ''
        if (language == 'ENG') {
            speechLanguage = 'en-US'
        }
        if (language == 'PL') {
            speechLanguage = 'pl'
        }
        if (language == 'UA') {
            setIsThereSpeechRecognition(false)
        }

        SpeechRecognition.startListening({ continuous: true, language: speechLanguage })
        console.log('start listening...')
        setSpeechActive(true)
    }
    const stopListening = () => {
        SpeechRecognition.stopListening({ continuous: true })
        console.log('stop listening!')
        setTextArea(textArea + transcript)
        resetTranscript()
        setSpeechActive(false)

    }

  return (
      <div className="p-2 pt-0">
          <div className="border-container">
              <form className="flex h-full" onSubmit={addNewMessage}>
                  <div className="grow relative">
                      {isThereSpeechRecognition && (
                        
                          <div className="absolute right-0 top-0">
                              {!speechActive ? (
                                <div onClick={e => startListening()} className="text-4 XL">
                                  <img src={microphone} className='w-[50px]' alt="Start" />
                                </div>
                                      ): (
                              <div onClick={e => stopListening()}>
                                  <img src={microphone} className='w-[50px] opacity-60' alt="Stop" />
                                </div>
                                  )}
                            </div>
                          )}
                      <textarea
                          value={textArea + transcript}
                          onChange={e => setTextArea(e.target.value)}
                          onKeyPress={e=>handleKeyPress(e)}
                          tabIndex='1'
                          className='w-full p-4 h-full bg-[#F5E9CD] text-2xl text-area'
                          placeholder='Type text here...'>
                          
                      </textarea>
                  </div>
                  <div className="mobile-menu sm:hidden block relative">
                      <div className="background-net w-full h-full"></div>
                      <div className="flex flex-col items-center justify-center relative z-10 p-2 h-full gap-4">
                          <div className="border p-2">
                              <img src={back} alt="" />
                          </div>
                          <div className="border px-2 py-2 text-3xl prev-game relative" onClick={fetchImage}>
                              IMG
                          </div>
                        </div>
                  </div>
                  <div className="p-2 hidden sm:block">
                      <div className="flex flex-col gap-[7px]">
                          <button disabled={isLoading} tabIndex='1' type='submit' className='py-2 text-2xl w-[220px]'>Send</button>
                          <div className="flex items-center justify-between">
                              <p className='block text-2xl'>Font size:</p>
                              <div className="flex relative top-0 left-0">
                                  <div className="text-4xl border p-2">{fontSize}</div>
                                  <div className="border px-1 prev-game" onClick={e => setShowFontSize(!showFontSize)}><img className="mt-5" src={arrow} alt="" /></div>
                                  {showFontSize && (
                                      
                                      <div className="absolute md:top-[-380%] border p-2 flex flex-col gap-1 justify-center items-center">
                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e=> changeFontSize(32)}>32</p>
                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(26)}>26</p>
                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(24)}>24</p>
                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(22)}>22</p>
                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(18)}>18</p>
                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(16)}>16</p>
                                    </div>
                                      )}
                              </div>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                              <p className='block text-2xl'>Previous message:</p>
                              <div className="border px-1 prev-game" onClick={e=>prevMessage()}>
                                  <img className="px-1 py-2" src={back} alt="" />
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="border-around p-2 hidden lg:block">
                      <div className="h-full  relative w-[200px] p-2">
                          <div className="background-net"></div>
                      </div>
                  </div>
                  <div className="px-4 py-1 hidden sm:block">
                      <div className="flex flex-col gap-[7px] ">
                          <div className="flex items-center justify-between">
                              <p className='block text-2xl'>Images:</p>
                              <div className="border p-2 px-3 text-3xl prev-game" onClick={fetchImage}>
                                  IMG
                              </div>
                          </div>
                          <div className="flex items-center justify-between" onClick={petroSound}>
                              <p className='block text-2xl'>Sounds:</p>
                              <div className="border p-2 px-3 text-3xl prev-game">
                                  SHCZ
                              </div>
                          </div>
                          <div className="flex items-center justify-between" onClick={bruhSound}>
                              <p className='block text-2xl'>Bruh:</p>
                              <div className="border p-2 px-3 text-3xl prev-game">
                                  B
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  )
}

export default GameMenu
