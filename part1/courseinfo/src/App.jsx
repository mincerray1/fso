import Header from './Header'
import Content from './Content'
import Total from './Total'

import { useState } from 'react'

import Display from './Display'

const App = (props) => {
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)

    const setToZero = () => setCounter(0)
    
    const course = {
        name: 'Half Stack application developmentuuuu',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]

    }

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)

    const [value, setValue] = useState(10)

    const [clicks, setClicks] = useState({
        left: 0, right: 0
    })

    const handlLeftClick = () => {
        setAll(allClicks.concat('L'))
        const updatedLeft = clicks.left + 1
        setClicks({...clicks, left: updatedLeft})
        setTotal(updatedLeft + clicks.right)
    }

    const handlRightClick = () => {
        setAll(allClicks.concat('R'))
        const updatedRight = clicks.right + 1
        setClicks({...clicks, right: updatedRight})
        setTotal(clicks.left + updatedRight)
    }

    const setToValue = (newValue) => {
        console.log('value now', value)
        setValue(newValue)
    }
  
    return (
      <div>
        {clicks.left}
        <Button onClick={handlLeftClick} text="left" />
        <Button onClick={handlRightClick} text="right" />
        {clicks.right}
        <History allClicks = {allClicks} />
        <p>total {total}</p>

        <p>{value}</p>
        <Button onClick={() => setToValue(1000)} text='thousand' />
        <Button onClick={() => setToValue(0)} text='reset' />
        <Button onClick={() => setToValue(value + 1)} text='increment' />

        <Display counter={counter} />
        <Button onClick={increaseByOne} text="plusz" />
        <Button onClick={setToZero} text="zero" />
        <Button onClick={decreaseByOne} text="minus" />
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
      </div>
    )
  }
  
  export default App

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}