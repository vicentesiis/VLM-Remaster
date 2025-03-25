import React from "react"
import { Card, CardHeader, CardContent, CardTitle, CardSubTitle } from "@/components/ui/card"

export const Tasks = () => {
  return (
    <div className="w-full px-4">
      {/* This ensures the card is responsive and doesn't grow too wide */}
      <Card className="mx-auto w-full max-w-screen-xl">
        <CardHeader>
          <CardTitle className="mb-2" >Tareas</CardTitle>
          <CardSubTitle> Sub Tareas </CardSubTitle>
        </CardHeader>
        <CardContent>{/* Content goes here */}</CardContent>
      </Card>
    </div>
  )
}

export default Tasks
