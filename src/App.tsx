/* eslint-disable @typescript-eslint/no-explicit-any */


import { useEffect } from 'react';
import { useForm } from "react-hook-form"
import './App.css'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tg = (window as any).Telegram.WebApp;
function App() {

  const {
    register,
    handleSubmit,
  } = useForm()

  useEffect(() => {
    tg.ready();
  }, [])

  const onSubmit = (data: any) => console.log(data)

  return (
    <>

      <form encType="multipart/form-data" {...register("images")} onSubmit={handleSubmit(onSubmit)}>
        <input type="file" multiple />
      </form>

    </>
  )
}

export default App
