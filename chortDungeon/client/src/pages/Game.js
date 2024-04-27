import logo from '../assets/logo.svg'
import cross from '../assets/cross.svg'
import bg from '../assets/gamebg.gif'
import img from '../assets/image.jpg'
import settings from '../assets/options.svg'
import arrow from '../assets/arrow.svg'
import quit from '../assets/quit.svg'
import GameMenu from '../components/GameMenu'
import loading from '../assets/loading.webp'
import petal from '../assets/golden_petal.png'
import redpetal from '../assets/red_petal.png'
import { useState, useEffect } from 'react'

import { appContext } from '../Desktop'
import { useContext } from 'react'

const Game = () => {
    const [mobileSettings, setMobileSettings] = useState(false)
    
    const { prompt, language, setStartGame, isThisPreviousGame, setIsThisPreviousGame, currentTime, setIsFooterVisible } = useContext(appContext)

    //leave game
    const showMobileSettings = () => {
        setMobileSettings(!mobileSettings)
    }

    
    //which language to use
    const langOfPrompt = () => {
        if (language == 'ENG')
            return [
        { "role": "user", "content": `You are a game bot that presents hypothetical and fantastical scenarios. I am a user cast in the role of the main character in the story you create. ${prompt}. You will then provide information about ongoing events, and I will react by describing my desired actions. You should continue the game without interruptions, regardless of my responses. If you understand this, just reply 'OK' and wait until I say 'start' before you begin.` },
                { "role": "assistant", "content": "OK, I understand the rules of the game. When you're ready, say 'start,' and we'll embark on an adventure in a fantastic magical world as a ninja with the ability to burn everything you touch." },
                { "role": "user", "content": "start" }
            ]
        if (language == 'PL')
            return [
        { "role": "user", "content": `Jesteś botem do gier, który przedstawia hipotetyczne i fantastyczne scenariusze. ${prompt}. Następnie dostarczysz informacje na temat trwających wydarzeń, a ja będę reagować, opisując moje pożądane działania. Powinieneś kontynuować grę bez przerw, bez względu na moje odpowiedzi. Jeśli to rozumiesz, po prostu odpowiedz 'OK' i poczekaj, aż powiem 'rozpocznij', zanim zaczniesz.` },
        { "role": "assistant", "content": "OK, rozumiem zasady gry. Kiedy będziesz gotów, powiedz 'rozpocznij', a zaczniemy przygodę w fantastycznym magicznym świecie jako ninja ze zdolnością spalania wszystkiego, czego dotkniesz." },
        { "role": "user", "content": "rozpocznij" }
    ]
    if (language == 'UA')
    return [
                { "role": "user", "content": "Ти - бот для ігор, який представляє гіпотетичні та фантастичні сценарії. Я - користувач, узятий на роль головного героя в історії, яку ти створюєш. Потім ти надаватимеш інформацію щодо триваючих подій, і я буду реагувати, описуючи свої бажані дії. Ти повинен продовжувати гру без перерв, незалежно від моїх відповідей. Якщо ти це розумієш, просто відповідь 'OK' і зачекай, доки я скажу 'start', перш ніж починати." },
                { "role": "assistant", "content": "OK, я розумію правила гри. Коли ти будеш готовий, скажи 'start', і ми вирушимо в пригоду в фантастичний магічний світ як ніндзя з здатністю палити все, до чого торкнешся." },
                { "role": "user", "content": "start" }
            ]
        }
        const [chatLog, setChatLog] = useState(langOfPrompt())
        
        //receiving userId
    const [userId, setUserId] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    useEffect(() => {
        //hiding footer
        setIsFooterVisible(false);

        console.log('isThisPreviousGame: ', isThisPreviousGame)
        console.log('--checking for succesfull login--')
        fetch('http://localhost:5000/auth/cabage', {
            method: 'GET', // or any other HTTP method
            credentials: 'include', // Allow credentials (cookies) to be sent with the request
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserId(data);
                if (isThisPreviousGame) {
                    setPreviousChatLog(data)
                    setIsThisPreviousGame(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setIsLoggedIn(false)
            });
    }, [])
    //fetch previous chatlog if this is an existing game
    const setPreviousChatLog = async (userId) => {
        console.log('--setting previous chatlog--')
        try {
            // Assuming you have the userId and gamePrompt dynamically

            const response = await fetch(`http://localhost:5000/db/chatLog?userId=${userId}&gamePrompt=${prompt}`, {
                method: 'GET',

            });

            if (response.ok) {
                const data = await response.json();
                const newChatLog = data.chatLog.map(obj => {
                    const { _id, ...rest } = obj;
                    return rest;
                });
                console.log('new chatlog is: ', newChatLog)
                setChatLog(newChatLog);
            } else {
                console.error('Error fetching chat log:', response.statusText);
                // Handle error, display a message, or perform any other necessary actions
            }
        } catch (error) {
            console.error('Error fetching chat log:', error.message);
            // Handle error, display a message, or perform any other necessary actions
        }
    }

    //fetch data after new chatlog message was added
    
    const [startIndex, setStartIndex] = useState(1)
    useEffect(() => {
        if (startIndex === 1 && !isThisPreviousGame ) {
            console.log('img ')
            fetchData().then(() => {
                // fetchImage();
                setStartIndex(0);
                saveGame()
            });
        }
    }, [chatLog]);
    
    //save game or create new
    const saveGame = async () => {
        if (isLoggedIn) {
            if (!isThisPreviousGame) {
                try {
                    const response = await fetch('http://localhost:5000/db/create/game', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any additional headers as needed
                    },
                    body: JSON.stringify({ 'gamePrompt': prompt.trimEnd(), 'chatLog': chatLog, 'userId': userId }),
                    credentials: 'include'
                });
            
                if (response.ok) {
                    const data = await response.json();
                console.log('Game created successfully', data);
                // Handle success, update state, or perform any other necessary actions
            } else {
                const errorData = await response.json();
                console.error('Error creating game:', errorData.error);
                // Handle error, display a message, or perform any other necessary actions
            }
        } catch (error) {
            console.error('Error creating game:', error);
            // Handle error, display a message, or perform any other necessary actions
        }
    }
    }
    }

    const [textArea, setTextArea] = useState([])
    //starting gpt request
    const fetchData = async () => {
        setTextArea('')
        console.log('is this previous game: ', isThisPreviousGame)
        console.log("before fethch: ", chatLog)
            setIsLoading(true)
            try {
                const response = await fetch(`http://localhost:5000/openai/gpt`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: chatLog }),
                });

                if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setChatLog((prevChatLog) => [...prevChatLog, data]);
                console.log("after fethch: ", chatLog)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                throw new Error('Request failed');
                
            }
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false)
        }
    };

    //add new message
    const addNewMessage = (e) => {
        e.preventDefault();

        // Update the chatLog state
        setChatLog((prevChatLog) => [
            ...prevChatLog,
            { role: "user", content: textArea },
        ]);

        setStartIndex(1)
        setTextArea(''); // Clear the textArea after fetching data
    }

    //return to menu
    const returnToMenu = () => {
        setStartGame(false)
    }

    const [isLoading, setIsLoading] = useState(false)

    const prevMessage = () => {
        if (!isLoading) {
            const newChatLog = chatLog.slice(0, -1);
            
            setChatLog(newChatLog);
        }
    }
    //menu functionality
    const [fontSize, setFontSize] = useState(24);

    const dynamicFontSize = {
        fontSize: `${fontSize}px`,
    };
    const [showFontSize, setShowFontSize] = useState(false)
    const changeFontSize = (value) => {
        setFontSize(value)
        setShowFontSize(false)
    }
    const quitGame = () => {
        saveGame().then(() => {
            setStartGame(false)
        })
    }
    //handle img
    const [image, setImage] = useState("")
    const [isGeneratedImage, setIsGeneratedImage] = useState(false)
    const fetchImage = async () => {
        console.log('generating img...')
        try {
            const response = await fetch(`http://localhost:5000/openai/image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: chatLog[chatLog.length - 1].content }),
            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setIsGeneratedImage(true)
                setImage(data)
                setIsImageActive(true)
            } else {
                throw new Error('Request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const [isImageActive, setIsImageActive] = useState(true)


  return (
      <section className="w-full h-full xl:px-6 ">
          {/* mobile img */}
          {/* {isImageActive && (
              <div className="fixed border-container top-[80px]  right-[20px] p-4 w-[165px] " onClick={setIsImageActive(false)}>

                  {isGeneratedImage ? (
                      <img src={`data:image/png;base64,${image.photo}`} alt="" className='border w-full h-full object-cover' />
                  ) : (
                      <img src={img} alt="" className='border w-full h-full object-cover w-[124px]' />
                  )}
              </div>
          )} */}

          <div className="p-1 lg:p-4 pb-2 h-full w-full ">
              <div className="border-container w-full flex flex-col h-full ">
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
                      <div className="block sm:hidden border my-1 relative" >
                          <img src={settings} alt="" className='w-[50px]' onClick={showMobileSettings} />
                          {mobileSettings && (
                              <div className="absolute bottom-[-200px] w-[190px] right-0 border z-20 flex flex-col items-center p-2 flex flex-col gap-2">
                                  <div className="flex justify-between items-center w-full">
                                      <p className='block text-2xl'>Sounds:</p>
                                      <div className="border text-3xl p-1 self-end">OFF</div>
                                  </div>
                                  <div className="flex items-center justify-between w-full">
                                      <p className='block text-2xl'>Font size:</p>
                                      <div className=" flex">
                                          <p className='block text-2xl border p-2'>{fontSize}</p>
                                          <div className="border pt-5 prev-game relative" onClick={e => setShowFontSize(!showFontSize)}>
                                              <img src={arrow} alt="" />
                                              {showFontSize && (
                                                  <div className="absolute border p-2 flex flex-col gap-1 justify-center items-center">
                                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(32)}>32</p>
                                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(26)}>26</p>
                                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(24)}>24</p>
                                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(22)}>22</p>
                                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(18)}>18</p>
                                                      <p className='text-4xl cursor-pointer hover:text-5xl' onClick={e => changeFontSize(16)}>16</p>
                                                  </div>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                                  <div className="flex items-center justify-between w-full">
                                      <p className='block text-3xl '>Quit</p>
                                      <div className="block border prev-game p-2" onClick={quitGame}>
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
                                  <div className="border net-top p-2" onClick={returnToMenu}>
                                      <img src={cross} alt="Chort is watching!" className='w-[25px] sm:w-[40px]' />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </header>
                  <div className="w-full relative h-full">
                      <img src={bg} alt="" className='absolute top-0 left-0 object-cover w-full h-full' />
                      <div className="relative top-0 left-0 z-10 ">
                          <div className="flex flex-col h-full">
                              <div className="flex max-h-[72vh] md:min-h-[64vh] md:max-h-[64vh] lg:min-h-[65vh] lg:max-h-[65vh]">
                                  <div className="scroll-container w-full flex flex-col px-4 mb-4">
                                      {chatLog.slice(3).map((message, index) => (
                                          <div
                                              style={dynamicFontSize}
                                              className={` border-container p-2 max-w-[78%] pt-2 mt-2
                                               ${message.role == "assistant" ? 'self-start message-ai' : 'self-end'
                                                  }`}
                                              key={index}
                                          >
                                              {message.content}
                                          </div>
                                      ))}
                                      {isLoading && (
                                      <div className="border-container p-2 max-w-[75%] pt-2 mt-2 self-start"><img src={loading} alt="" className='w-[40px]' /></div>
                                      )}
                                  </div>
                                  {isImageActive && (
                                      <div className="p-1 lg:p-2 fixed lg:top-0 top-[70px] right-0 w-[170px] lg:w-auto lg:relative lg:block prev-game" onClick={e => setIsImageActive(false)}>
                                          <img src={redpetal} alt="" className='fixed z-10 w-[90px] lg:w-[110px]  right-[-50px] lg:right-[-50px] top-[280px] lg:top-[270px] rotate-[-70deg]' />
                                          <div className="border-container h-full p-4">
                                              {isGeneratedImage ? (
                                                  <img src={`data:image/png;base64,${image.photo}`} alt="" className="border w-full h-full object-cover" />
                                              ) : (
                                                  <img src={img} alt="" className="border w-full h-full object-cover" />
                                              )}
                                          </div>
                                      </div>
                                  )}
                            </div>
                              <GameMenu
                                textArea={textArea}
                                setTextArea={setTextArea}
                                addNewMessage={addNewMessage}
                                prevMessage={prevMessage}
                                  isLoading={isLoading}
                                  fontSize={fontSize}
                                  setFontSize={setFontSize}
                                  fetchImage={fetchImage}
                                  language={language}
                              />
                          </div>
                      </div>
                  </div>
              </div>
        </div>
    </section>
  )
}

export default Game
