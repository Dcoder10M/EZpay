import axios from 'axios'

function App() {
  async function handle(){
    await axios.post("http://localhost:3000/api/v1/account/transfer",{
        "to":"664f4989baf477d7d9036457",
        "amount":100
    },{
        headers: {
            'Content-Type': 'application/json',
            'token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRmNTlkOWRjYjUzNjg0YzJjZWFkZDEiLCJpYXQiOjE3MTY0NzYzNzd9.lq0rbEoVDer8bcGSlBgTeCYquQ5w1whjShIGU_cwV6o' // Replace with your actual token if needed
        }
    })
    await axios.post("http://localhost:3000/api/v1/account/transfer",{
        "to":"664f4989baf477d7d9036457",
        "amount":200
    },{
        headers: {
            'Content-Type': 'application/json',
            'token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRmNTlkOWRjYjUzNjg0YzJjZWFkZDEiLCJpYXQiOjE3MTY0NzYzNzd9.lq0rbEoVDer8bcGSlBgTeCYquQ5w1whjShIGU_cwV6o' // Replace with your actual token if needed
        }
    })
  }
  return (
    <div>
    <button onClick={handle}>Transaction</button>
    </div>
  )
}

export default App
