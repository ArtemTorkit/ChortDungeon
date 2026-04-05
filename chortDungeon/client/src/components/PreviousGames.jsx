import { useState, useEffect, useContext } from 'react'
import { appContext } from '../context/AppContext'
import { fetchPreviousGames } from '../services/api'

const PreviousGames = ({setActivePage}) => {
    const { setPrompt, setStartGame, setIsThisPreviousGame } = useContext(appContext)
    const [prevGames, setPrevGames] = useState([])

    useEffect(() => {
        fetchPreviousGames()
            .then((data) => {
                console.log('Game Prompts:', data.gamePrompts);
                setPrevGames(data.gamePrompts)
            })
            .catch(error => {
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
                        <div key={index} className='w-full previous-game-container px-4 py-2 prev-game' onClick={e => prevGame(text)}>{text}</div>
                    ))}
                </div>
                <div className='text-center pt-2'>
                    <p className="inline text-2xl hover:underline cursor-pointer active:opacity-50" onClick={e => setActivePage(2)}>
                        Start new game
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PreviousGames
