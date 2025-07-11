import { useCallback, useState,useEffect, use, useRef } from 'react'


function App() {
const [length,setLength] = useState(8);
const [allownum,setAllownum] = useState(false);
const [specChar,setSpecChar] = useState(false); // this both use for checkbox's
const [Passward,setPassward] = useState("")

// Genarating passward
// 🔄 What is useCallback?
// useCallback is a React Hook that remembers (caches) a function, so it doesn’t get recreated every time your component re-renders.
// “Only recreate this function if something in [dependencies] changes.”
const passgeneator = useCallback(()=>{
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(allownum) str += "123456789";
  if(specChar) str += "~!@#$%&*";
  for(let i = 1 ;i<=length;i++){
    pass += str.charAt(Math.floor(Math.random()*str.length+1));
  }
  setPassward(pass);
},[length,allownum,specChar,setPassward]); // it will re-render if its dependies value change(eg : true->false etc)

// useEffect hook
useEffect(()=>{
  passgeneator()
},[length,allownum,specChar,passgeneator])

// useRef Hook
const passref = useRef(null);
//  Function to copy passaward
const copyPass = useCallback(()=>{
  passref.current?.select(); // it will highlight copied text  
  passref.current?.setSelectionRange(0,999); // the range till to copy text
  window.navigator.clipboard.writeText(Passward) // copy text to clipcoard
},[Passward])

  return (
    <>

      <div className="bg-cyan-700 absolute h-50 w-2xl rounded-2xl shadow-md">
        {/* A h1  tag heading */}
        <h1 className="text-emerald-600 text-4xl text-center font-bold ">Passward Generator</h1>
        {/* A div for input boxand copy button */}
        <div className="flex flex-row mt-6 justify-center m-10 p-2 h-15">
          <input type="text" 
          value={Passward}
          placeholder='passward'
          readOnly
          className="outline-none  bg-amber-500 w-full   rounded-l-xl"
          ref={passref}
          />
          <button className="bg-fuchsia-400 rounded-r-xl w-20 hover:bg-fuchsia-600"
          onClick={copyPass}
          >copy</button>
        </div>
        {/* A div for range and checkboxs  */}
        <div className="flex justify-evenly font-bold text-sm gap-x-2">
          {/* Range */}
          <div className="flex items-center ml-5 gap-x-1">
            <input 
            type="range"
            min={6}
            max={48}
            value={length}
            className="cursor-pointer"
            onChange={(e)=> setLength(e.target.value)}
            />
            <label className='font-bold' >Length : {length}</label>
          </div>
          {/* Num CheckBox */}
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
             defaultChecked={allownum}
             id='numinput'
             onChange={()=>{
              setAllownum(prev => !prev)
             }}
            />
            <label htmlFor="numinput">Numbers</label>
          </div>
          {/* Char CheckBox */}
        <div className="flex items-center gap-x-1">
            <input type="checkbox"
             defaultChecked={specChar}
             id='spelchar'
             onChange={()=>{
              setSpecChar(prev => !prev)
             }}
            />
            <label htmlFor="spelchar">Speacial Charaters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
