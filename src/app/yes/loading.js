"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(20)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 300)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[100%]" />
}
