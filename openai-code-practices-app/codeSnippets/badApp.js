import { useEffect, useState } from "react";

const HelloName = ({ onChange }) => {
  const [helloValue, setHelloValue] = useState("Justin")

  useEffect(() => {
    onChange(helloValue)
  }, [helloValue, onChange])

  return (
    <input type="text" value="Justin" onChange={e => setHelloValue(e.target.value)} />
  )
}

const App = () => {
  const [inputValue, setInputValue] = useState("")

  return (
    <>
      <div>
        The App Container
      </div>
      <div>
        <HelloName onChange={setInputValue} />
      </div >
      <div>
        Hello. {inputValue}
      </div>
    </>
  )
}

export default App