import { useState, useEffect } from 'react'

import { appContext } from '../Desktop'
import { useContext } from 'react'

const PreviousGames = () => {
    const { setActivePage, setPrompt, setStartGame, setIsThisPreviousGame } = useContext(appContext)
    const [prevGames, setPrevGames] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/db/games', {
            method: 'GET',
            credentials: 'include', // or 'same-origin' depending on your setup
            headers: {
                'Content-Type': 'application/json',
                // Include any other headers that your API requires
            }
        })
        .then(response => {
            // Check if the response status is OK (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON in the response
            return response.json();
        })
        .then(data => {
            // Handle the data from the response
            console.log('Game Prompts:', data.gamePrompts);
            setPrevGames(data.gamePrompts)
            // Perform any other actions you need with the data
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
    },[])
    const prevGame = (prompt) => {
        setIsThisPreviousGame(true)
        setPrompt(prompt)
        setStartGame(true)
    } 
        return (
            <div className="w-full h-full">
                <div className="w-full h-full px-4">

                <div className='w-full border-around h-[325px] scroll-container object-cover text-2xl'>
                    {prevGames.map((text, index) => (
                        <div className='w-full previous-game-container px-4 py-2 prev-game' onClick={e => prevGame(text)}>{text}</div>
                    ))}
                    </div>
                    <div className='text-center pt-2'>
                        <p className="inline text-2xl  hover:underline cursor-pointer active:opacity-50" onClick={e => setActivePage(2)}>
                            Start new game
                        </p>
                    </div>
            </div>
      </div>
  )
}

export default PreviousGames
