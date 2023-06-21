import React, { useContext, useEffect } from 'react'

// router
import { Form, Link, useNavigate } from 'react-router-dom'

// services
import { getCategories } from '../Services'

// context
import { TriviaContext } from '../GlobalContext'

// styles
import styles from '../styles/Main.module.css'


export const Main = () => {

const { categories, setCategories, loader, setLoader, difficulties, setCategory, difficulty, setDifficulty, setPlayer } = useContext(TriviaContext)

const navigate = useNavigate()

useEffect(() => {
  getCategories(setLoader, setCategories)
}, [])

console.log(difficulty)


return (
      <>
        {loader ? 'loader' : 
        <Form onSubmit={(e) => {
          e.preventDefault()
          navigate('/quiz')
        }}>
          <input onChange={(e) => setPlayer(e.target.value)} required type='text' placeholder='Enter your name' />
          <select  onChange={(e) => {
            const idx = e.target.selectedIndex
            const optionEl = e.target.childNodes[idx]
            setCategory(optionEl.getAttribute('id'))
          }}>
            {categories.map((category) => {
              return <option id={category.id}>{category.name}</option>
            })}
          </select>
          <select onChange={(e) => {
                const idx = e.target.selectedIndex
                const optionEl = e.target.childNodes[idx]
                setDifficulty({
                  name: e.target.value.toLowerCase(),
                  points: parseFloat(optionEl.getAttribute('id'))
                })
              }}>
            {difficulties.map((difficulty) => {
              return <option id={difficulty.points}>{difficulty.name}</option>
            })}
          </select>
          <div className='buttonWrapper'>
            <button>Start</button>
            <button><Link to='highscores'>High Scores</Link></button>
          </div>
        </Form>
        }
      </>
  )
}
