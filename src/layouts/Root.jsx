import React, { useEffect, useState } from 'react'

// router
import { Outlet } from 'react-router'

// context
import { useContext } from 'react'
import { TriviaContext } from '../GlobalContext'

// logo
import logo from '../assets/brain.png'

import audio from '../assets/audio.mp3'

// icons
import { RxSpeakerLoud } from 'react-icons/rx';
import { RxSpeakerOff } from 'react-icons/rx';

// difficulties
const difficulties = [
  {
    name: 'Easy',
    points: 5
  },
  {
    name: 'Medium',
    points: 10
  },
  {
    name: 'Hard',
    points: 20
  }
]

export const Root = () => {

const allPlayers = localStorage.getItem("highscores")

const [loader, setLoader] = useState(true)
const [categories, setCategories] = useState([])
const [player, setPlayer] = useState('')
const [category, setCategory] = useState('9')
const [difficulty, setDifficulty] = useState({})
const [quizData, setQuizData] = useState([])
const [score, setScore] = useState(0)
const [sound, setSound] = useState(true)
const [scoreTable, setScoreTable] = useState(allPlayers ? JSON.parse(allPlayers) : [])

const toggleSound = () => {
  setSound((prev) => !prev)
}

useEffect(() => {
  localStorage.setItem("highscores", JSON.stringify(scoreTable.sort((a, b) => {
    return b.score - a.score
  })))
})

  return (
    <TriviaContext.Provider value={{
      categories, setCategories,
      loader, setLoader,
      player, setPlayer,
      category, setCategory,
      difficulty, setDifficulty,
      quizData, setQuizData,
      score, setScore,
      scoreTable, setScoreTable,

      difficulties
    }}>
      <audio src={audio} loop='loop'></audio>
      <div className='rootWrapper'>
          {sound ? <RxSpeakerLoud onClick={toggleSound} className='soundIcon' /> : <RxSpeakerOff onClick={toggleSound} className='soundIcon' />}
          <div className='titleLogo'>
              <span>Quiz</span>
              <img src={logo} alt='brain' />
              <span>Time</span>
          </div>
          <button onClick={() => music()}></button>
          <Outlet />
      </div>
    </TriviaContext.Provider>

  )
}
