'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ClientDeleteButton from './ClientDeleteButton';
export default function ClientTableRow({data, i, dbColumn, typeOfTable, apiPath}) {
const [isClicked, setIsClicked] = React.useState(false);

function handleClick(){
  setIsClicked(!isClicked);
  console.log('isClicked', isClicked)
}


  return (
   <TableRow onClick={handleClick} key={i}>
                     <TableCell key={i}><img className="rounded-full w-10 h-10 " src={data.profile.imgUrl} />{data.profile.nickname }</TableCell>
                   {dbColumn.map((column,i) => {
                     if(i>0){
                         return <TableCell key={i}>{data[column]}</TableCell>
                     }
                   
                   })}
               <TableCell><ClientDeleteButton id={data.id} typeOfTable={typeOfTable} apiPath={apiPath}/></TableCell>
               </TableRow>
  )
}
