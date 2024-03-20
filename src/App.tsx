

import { useEffect } from 'react';
import './App.css'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tg = (window as any).Telegram.WebApp;
function App() {

  useEffect(() => {
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close();
  }

  return (
    <>
      <div className="App">
        <button onClick={onClose}>Закрыть</button>
      </div>

    </>
  )
}

export default App
