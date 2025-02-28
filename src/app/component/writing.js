'use client'
import React from 'react'
import {useState, useEffect} from 'react'
import PopUpWriting from './PopUpWriting'
import { Button } from "@/components/ui/button"


export default function Writing({apiPath}) {
  const [isClicked, setIsClicked] = useState(false);

  const buttonHandler = (e) => {
    e.preventDefault()
    setIsClicked(!isClicked)
  }

  

  return (
    <>
        <Button onClick={buttonHandler}>글쓰기</Button>
        {isClicked?<PopUpWriting apiPath={apiPath} isClicked={isClicked}setIsClicked={setIsClicked}></PopUpWriting>: null}
    </>
  )
}
