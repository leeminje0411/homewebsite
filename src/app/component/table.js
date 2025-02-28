import React from 'react'
import Wrting from './writing'
import  {supabase}  from '@/lib/db';
import convert24To12 from '@/lib/conver24To12'
import dateCutter from '@/lib/dateCutter';
import Image from "next/image";
import { Button } from "@/components/ui/button1"; // ✅ 올바른 경로 확인
import ClientTableRow from './ClientTableRow';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const schedulePath = '/api/schedule'
const chargePath = '/api/charge'
import ClientDeleteButton from './ClientDeleteButton';


export default async function MyTable({className, typeOfTable}) {
  let apiPath = typeOfTable === 'schedule' ? schedulePath : chargePath;
  let tableHeader = [];
  let dbColumn = [];
      if(typeOfTable === 'schedule'){
        tableHeader.push('프로필','일정','시작','종료','작성일')
        dbColumn=['writer','schedule','startTime','endTime','created_at']
        }else if(typeOfTable === 'charge'){
      tableHeader.push('프로필','피청구인','금액','청구이유','작성일')
      dbColumn=["charger","chargee","price","reason","created_at"]
    }

  let formData = null;
  console.log('apiPath: 여기로 날립니다', apiPath)

    await new Promise((resolve, reject)=>{
      fetch('http://localhost:3000'+apiPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      formData = data;
	    if(typeOfTable === 'schedule'){
        formData = formData.map((item) => {
      return {
          ...item,
          startTime: convert24To12(item.startTime),
          endTime: convert24To12(item.endTime),
            };
    });   
    }else if(typeOfTable === 'charge'){

        }
   resolve(); 
   formData = dateCutter(formData);
    } 
  
  
  )
    .catch(err => console.error(err))
  })
  const firstKey = Object.keys(formData)[0];
  console.log('firstKey:', firstKey);



  return (


    <div className={className}>
    <div className='flex justify-between items-center'>
      <h1>{typeOfTable ==='schedule'? <>오늘의 일정</>: <>청구목록</>}</h1>
      <Wrting apiPath={apiPath}></Wrting>
    </div>
  <Table className="bg-white shadow-md rounded-lg">
  <TableHeader >
    <TableRow>
      
      {tableHeader.map((item,i) => {
        return <TableHead key={i}>{item}</TableHead>
      })}
     
    </TableRow>
  </TableHeader>
  <TableBody>
    {formData.map((data,i) => {
      
      return  (
              <TableRow key={i}>
                    <TableCell key={i}><img className="rounded-full w-10 h-10 " src={data.profile.imgUrl} />{data.profile.nickname }</TableCell>
                  {dbColumn.map((column,i) => {
                    if(i>0){
                        return <TableCell key={i}>{data[column]}</TableCell>
                    }
                  
                  })}
              <TableCell><ClientDeleteButton id={data.id} typeOfTable={typeOfTable} apiPath={apiPath}/></TableCell>
              </TableRow>
              
            
          )
            })}

  </TableBody>
  </Table>
    </div>
  )
}


