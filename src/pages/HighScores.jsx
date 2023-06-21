import React, { useContext } from 'react'

import { Link } from 'react-router-dom'

import { TriviaContext } from '../GlobalContext'

import gold from '../assets/firstPlace.png'
import silver from '../assets/secondPlace.png'
import bronze from '../assets/thirdPlace.png'

export const HighScores = () => {

const { scoreTable } = useContext(TriviaContext)

const trophies =  [null, gold, silver, bronze]

const handlePlaces = (place) => {
  if(place === 1 || 2 || 3) {
    return <td><img src={trophies[place]} /></td>
  }  
  
  if(place !== 1 || 2 || 3){
    return <td>{place}</td>
  }
}

  return (
    <>
      <table className='tHeader'>
      <tr>
        <th>Place</th>
        <th>Player</th>
        <th>Score</th>
      </tr>
      </table>
      <div className='tContent'>
      <table>
      {scoreTable.map((player, index) => {
        const place = index + 1
        return (
          <tr>
            {handlePlaces(place)}
            <td>{player.name}</td>
            <td>{player.score}</td>
          </tr>
              )
            })}
        </table>
      </div>
        <button><Link to='/'>Main Menu</Link></button>
      </>
  )
}
