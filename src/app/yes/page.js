import React from 'react'
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
async function page() {
    

  return (
      <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  )
}

export default page
    