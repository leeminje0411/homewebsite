'use client'

import React, { use } from 'react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"
import {
  Card,CardContent,CardDescription, CardFooter,CardHeader, CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,TabsContent,TabsList,TabsTrigger,} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { set } from 'date-fns'


export default function PopUpWriting({isClicked, setIsClicked, apiPath}) {
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(false)
      let dbColumn = [];
      let tableHeader = [];
  
      if(apiPath === '/api/schedule'){
        tableHeader.push('일정','시작','종료','작성일')
        dbColumn=['schedule','startTime','endTime']
        }else if(apiPath === '/api/charge'){
      tableHeader.push('피청구인','금액','청구이유')
      dbColumn=["chargee","price","reason"]
    }
    const newFormData = {};
    dbColumn.forEach((col) => {
    newFormData[col] = "";
    });
    const [formData, setFormData] = useState(newFormData);   
  
  const formDataHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const sendFormData = async (e) => {
    // Fetch for sending form data
    setIsLoading(true);
    // await fetch(apiPath, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })
    setIsLoading(false);
    router.refresh();
    setIsClicked(false);
  }

 


    return (
<Tabs defaultValue="account" className="w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>오늘의 일정을 추가하세요</CardTitle>
                <Button onClick={e=>setIsClicked(!isClicked)}variant="ghost">X</Button>
            </div>
          </CardHeader>
            
              <CardContent className="space-y-2">
              
               {/* <div className="space-y-1">
                  <Label htmlFor={dbColumn[0]}>{tableHeader[0]}</Label>
                  <Input id={dbColumn[0]}  onChange={formDataHandler} value={formData[dbColumn[0]]}/>
                </div> */}
              
                <div className="space-y-1"> 
                 
                { apiPath==='/api/schedule' ? ( 
                    <>
                     <Label htmlFor={dbColumn[0]}>{tableHeader[0]}</Label>
                  <Textarea id={dbColumn[0]} onChange={formDataHandler} value={formData[dbColumn[0]]}/>
                    </>):
                   (
                   <>
                       <Label htmlFor={dbColumn[0]}>{tableHeader[0]}</Label>
                  <Input id={dbColumn[0]} type="text" onChange={formDataHandler} value={formData[dbColumn[0]]}/> 
                   </>
                  )
                  }
                </div>
                  <div className="space-y-1">
                  { apiPath==='/api/schedule' ? ( 
                    <>
                    <Label htmlFor={dbColumn[1]}>{tableHeader[1]}</Label>
                    <Input id={dbColumn[1]} type="time" onChange={formDataHandler} value={formData[dbColumn[1]]}/> 
                    </>):
                   (
                   <>
                    <Label htmlFor={dbColumn[1]}>{tableHeader[1]}</Label>
                    <Input id={dbColumn[1]} type="number" onChange={formDataHandler} value={formData[dbColumn[1]]}/>
                   </>
                  )
                  }
                  </div>
                  <div className="space-y-1">
                    { apiPath==='/api/schedule' ? ( 
                    <>
                     <Label htmlFor={dbColumn[2]}>{tableHeader[2]}</Label>
                    <Input id={dbColumn[2]} type="time" onChange={formDataHandler} value={formData[dbColumn[2]]}/>
                    </>):
                   (
                   <>
                     <Label htmlFor={dbColumn[2]}>{tableHeader[2]}</Label>
                    <Textarea id={dbColumn[2]} type="text" onChange={formDataHandler} value={formData[dbColumn[2]]}/>
                   </>
                  )
                  }
                  </div>
              </CardContent>
              <CardFooter>
                <Button disabled={isLoading} variant='' className="w-full"onClick={sendFormData}>

          {isLoading?<Loader2 className="animate-spin" />:null}  등록</Button>
                
              </CardFooter>
         

        </Card>
      </TabsContent>

    </Tabs>

    )  
  }


