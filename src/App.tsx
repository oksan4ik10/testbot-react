/* eslint-disable @typescript-eslint/no-explicit-any */


import { useEffect, useRef, useState } from 'react';
import './App.css'
import urlFileImg from "./assets/default-create.png"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tg = (window as any).Telegram.WebApp;
function App() {

  useEffect(() => {
    tg.ready();
  }, [])

  // const onClose = () => {
  //   tg.close();
  // }

  const inputFiles = useRef<HTMLInputElement>(null);
  const [filesInfo, setFilesInfo] = useState<any[]>([]);

  const [uploadFiles, setUploadFiles] = useState<string[]>([]);
  // const [errorFile, setErrorFile] = useState("");
  const filesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const target = e.target as HTMLInputElement;
    const files: FileList | null = (target.files);
    if (files) {
      // if ((uploadFiles.length + files.length) > 4) {
      //   // setErrorFile("Выберите не более 4х файлов");
      //   return
      // }
      // // setErrorFile("");
      setFilesInfo([...filesInfo, ...files])
      const fileBase64Promises = Array.from(files).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve, reject) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = () => {
            reject(reader.error);
          };
        });
      });
      const fileBase64Arr: any[] = await Promise.all(fileBase64Promises);
      setUploadFiles([...uploadFiles, ...fileBase64Arr])

    }

  }

  const submit = (e: any) => {
    e.preventDefault();
    tg.close();
  }
  const focusForm = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target) {

      const topOffset = 10;
      const elementPosition = target.getBoundingClientRect().top <= 10 ? 0 : target.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;
      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

  }



  return (
    <>
      <form className="form" encType="multipart/form-data" onSubmit={submit} >
        <label className='label'>
          <span>Имя</span>
          <input type="text" name="name" placeholder='Заполните имя' onFocus={(e) => focusForm(e)} />
        </label>
        <label className='label'>
          <span>Имя</span>
          <input type="text" name="name" placeholder='Заполните имя' onFocus={(e) => focusForm(e)} />
        </label>
        <label className='label'>
          <span>Имя</span>
          <input type="text" name="name" placeholder='Заполните имя' onFocus={(e) => focusForm(e)} />
        </label>
        <label className='label' >
          <span>Имя</span>
          <input type="text" name="name" placeholder='Заполните имя' onFocus={(e) => focusForm(e)} />
        </label>
        <label className='label'>
          <span>Имя</span>
          <input type="text" name="name" placeholder='Заполните имя' onFocus={(e) => focusForm(e)} />
        </label>
        <label className='label'>
          <span>Имя</span>
          <input type="text" name="name" placeholder='Заполните имя' onFocus={(e) => focusForm(e)} />
        </label>
        <label className='label'>
          <span>Имя</span>
          <input type="text" name="name" placeholder='Заполните имя' onFocus={(e) => focusForm(e)} />
        </label>
        <label className='label'>
          <span>Имя</span>
          <input type="text" name="name" placeholder='Заполните имя' onFocus={(e) => focusForm(e)} />
        </label>


        <label className='label form__addFile'>
          <div className="wrapImg">
            <span>Файлы</span>
            <img src={urlFileImg} alt="addFile" />
          </div>
          <input ref={inputFiles} accept="image/png, image/jpeg" type="file" multiple id="files" onChange={filesChange} />

        </label>

        {(uploadFiles.length !== 0) && uploadFiles.map((item, index) => {
          return <label key={index}>
            <div className="wrapImg">
              <img src={item} alt="" />
            </div>
          </label>
        })}



        <input type='submit' className='button' defaultValue={"Сохранить"}></input>
      </form>

    </>
  )
}

export default App