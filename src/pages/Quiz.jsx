import React, { useContext, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { useNavigate } from 'react-router-dom'

import { decode } from 'html-entities'

// framer motion
import { motion } from "framer-motion"

// countdowntimer
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

// context
import { TriviaContext } from '../GlobalContext'

// services
import { getQuiz } from '../Services'

// answer letters
const letters = ['A', 'B', 'C', 'D']


export const Quiz = () => {

const [curr, setCurr] = useState(0)
const [key, setKey] = useState(0)
const [selected, setSelected] = useState(false)

const { category, difficulty, setLoader, loader, quizData, setQuizData, score, setScore, scoreTable, setScoreTable, player, setPlayer } = useContext(TriviaContext)

const navigate = useNavigate()

const questions = quizData.map((data) => {
  return data.question
})

const incorrectAnswers = quizData.map((data) => {
  return data.incorrect_answers.map((answer) => {
    return {
      name: answer,
      id: uuidv4()
    }
  })
})

const correctAnswers = quizData.map((data) => {
  return {
    name: data.correct_answer,
    id: uuidv4()
  }
})

const allAnswers = incorrectAnswers.map((answer, index) => {
  return [...answer, correctAnswers[index]].sort((a, b) => 0.5 - Math.random())
})


const handleSelect = (answer) => {
  setSelected(false)
  if(correctAnswers[curr].id === answer.id) {
    console.log('correct')
    setScore((prev) => prev + difficulty.points)
  } else {
    console.log('incorrect')
  }

  if(curr === allAnswers.length - 1 && correctAnswers[curr].id === answer.id) {
    setScore(score + difficulty.points)
    navigate('/end')
  }

  if (curr === allAnswers.length - 1 && correctAnswers[curr].id !== answer.id) {
    navigate('/end')
  }

  if (curr === allAnswers.length - 1) {
    if(scoreTable.find((item) => item.name === player)) {
      setScoreTable(scoreTable.map((item) => {
        return {...item, score: item.score + score}
      }))
      return item
    } else {
      setScoreTable([...scoreTable, {
        name: player,
        score: score
      }])
    }
  }

  setCurr(curr + 1)
  setKey((prev) => prev + 1)
}

const handleSelectClass = (answer) => {
  if (correctAnswers[curr].id === answer.id) {
    return 'green'
  } else {
    return 'red'
  }
}

useEffect(() => {
  getQuiz(setLoader, category, difficulty.name, setQuizData)
}, [])

console.log(allAnswers)
console.log(correctAnswers)
console.log(score)
console.log(difficulty.points)



  return (
    <>
      {loader ? 'loader' : 
        <div>
          <div className='timer'>
            <CountdownCircleTimer
              key={key}
              className='timer'
              isPlaying
              size={100}
              strokeWidth={6}
              duration={20}
              colors={['#69b3f8', '#ffdd00', '#d90429']}
              colorsTime={[20, 10, 5, 0]}
              isSmoothColorTransition={false}
              trailColor='#bde0fe46'
              onComplete={() => {
                setCurr(curr + 1)
                return { shouldRepeat: true }
              }}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>
          <h2>{decode(questions[curr])}</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {allAnswers[curr]?.map((answer, idx) => {
              return <button style={{ background: selected && handleSelectClass(answer) }} onClick={() => {
                setTimeout(() => {
                  handleSelect(answer)
                }, 1500)
                setSelected(true)
              }}>
                <span>{letters[idx]}</span><span>{decode(answer.name)}</span>
              </button>
            })}
          </form>
        </div>
      }
    </>
  )
}
