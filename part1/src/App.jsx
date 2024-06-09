// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

const Hello = (props) => {
    return (
      <div>
        <p>Hello {props.name}</p>
      </div>
    )
  }

const Footer = () => {
return (
    <div>
    greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
)
}

const App = () => {
    const now = new Date()
    const a = 13
    const b = 20
    console.log(now, a+b)

    const friends = [
        'Peter', 'Maya'
      ]
    
    return (
      <>
        <p>Hello world</p>
        <p>
            {a} plus {b} is {a+b}
        </p>
        <Hello name="John" />
        <Hello name="George" />
        <Footer />

        <p>{friends}</p>
      </>
    )
  }
  
export default App