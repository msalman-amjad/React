import './App.css'
import Card from './components/card'

function App() {
  let myobj = {
    name: 'salman',
    age: 21
  }
  //in the same way we can pass array in props
  let arr = [1, 2, 3, 4, 5]
  return (
    <>
      <h1 className='bg-green-400 mt-10 text-black p-4 rounded-xl mx-auto w-fit mb-10'> Tailwind test</h1>
      <Card name="salman-test1" someobj={myobj} somearr={arr} />

    </>
  )
}

export default App