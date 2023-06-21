import React, { useContext } from 'react'
import { TriviaContext } from '../GlobalContext'

import { Link, useNavigate } from 'react-router-dom'

export const End = () => {

const navigate = useNavigate()

const { score, difficulty, scoreTable, setScore,  } = useContext(TriviaContext)

console.log(scoreTable)

const handlePlayAgain = () => {
  setScore(0)
  navigate('/quiz')
}

  return (
    <div>
      <h2>Score: {score}</h2>
      <h2>Correct Answers: {score / difficulty.points}/10</h2>
      <div className='buttonWrapper'>
            <button onClick={handlePlayAgain}>Play Again</button>
            <button><Link to='/highscores'>High Scores</Link></button>
          </div>
    </div>
  )
}
