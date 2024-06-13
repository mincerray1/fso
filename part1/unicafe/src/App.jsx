import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})

  const [selected, setSelected] = useState(0)

  const selectRandom = () => {
    setSelected(Math.floor((Math.random() * anecdotes.length)))
  }

  const vote = (index) => () => {
    const copy = {...points}
    copy[index] += 1
    setPoints(copy)
  }

  const getHighestVote = () => {
    const highest = Object.keys(points).reduce(function(a, b){ return points[a] > points[b] ? a : b }); //Object.keys(sortedDict(points))[0]
    return highest
  }

  const sortedDict = (dict) => {
    Object.fromEntries(
        Object.entries(dict).sort(([,a],[,b]) => a- b)
        )
  } 

  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood((good) => good + 1)} text='good' />
        <Button handleClick={() => setNeutral((neutral) => neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad((bad) => bad + 1)} text='bad' />
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral}/>
        <br />
        <div>
            <h2>anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>votes {points[selected]}</p>
            <p>
                <Button handleClick={vote(selected)} text='vote' />
                <Button handleClick={selectRandom} text='next anecdote' />
            </p>
            <h2>anecdote with most votes</h2>
            <p>{anecdotes[getHighestVote()]}</p>
            <p>has {points[getHighestVote()]} votes</p>
        </div>
    </div>
  )
}

export default App

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}
const Statistics = ({good, bad, neutral}) => {
    const getAll = () => {
      return good + bad + neutral
    }
  
    const getAverage = () => {
      return ((good * 1) + (bad * -1) + (neutral * 0)) / getAll()
    }
  
    const getPositive = () => {
      return Math.round((good * 10000) / getAll()) / 100
    }

    if (good === 0 && bad === 0 && neutral === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    return (
        <table>
            <tbody>
                <StatisticLine text='good' value={good} />
                <StatisticLine text='neutral' value={neutral} />
                <StatisticLine text='bad' value={bad} />
                
                <StatisticLine text='all' value={getAll()} />
                <StatisticLine text='average' value={getAverage()} />
                <StatisticLine text='positive' value={getPositive() + '%'} />
            </tbody>
        </table>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}