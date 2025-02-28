import React from "react"
import Gallery from "./component/gallery"
import MyTable from "./component/table"

export default function DatePickerDemo() {
  // const [date, setDate] = React.useState(null)

  return (
    <>
      <div className="w-full">
        <Gallery />
        
        <div className="flex flex-wrap justify-around">
          {/* <MyTable typeOfTable="schedule" className=" w-full md:w-1/3" />
          <MyTable typeOfTable="charge"className=" w-full md:w-1/3" /> */}
        </div>
      </div>
      
    </>
  )
}

