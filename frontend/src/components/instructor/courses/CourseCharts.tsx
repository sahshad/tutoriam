import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function CourseCharts() {
  const [revenueTimeframe, setRevenueTimeframe] = useState("month")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Revenue</CardTitle>
          <Select value={revenueTimeframe} onValueChange={setRevenueTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="This month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] relative">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 py-4">
              <div>₹1M</div>
              <div>₹500k</div>
              <div>₹100k</div>
              <div>₹50k</div>
              <div>₹10k</div>
              <div>₹0</div>
            </div>
            <div className="absolute left-8 right-0 top-0 bottom-0">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <path
                  d="M0,150 C20,100 40,200 60,150 C80,100 100,200 120,150 C140,100 160,200 180,150 C200,100 220,200 240,150 C260,100 280,200 300,150 C320,100 340,200 360,150 C380,100 400,200 400,150"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                <circle cx="200" cy="150" r="5" fill="black" />
                <text x="200" y="130" textAnchor="middle" fontSize="12" fill="black">
                  ₹7,749
                </text>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
{/* 
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Course Overview</CardTitle>
          <Select value={overviewTimeframe} onValueChange={setOverviewTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="This month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Tabs value={overviewTab} onValueChange={setOverviewTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="view">View</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="h-[300px] relative">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 py-4">
              <div>100k</div>
              <div>50k</div>
              <div>10k</div>
              <div>5k</div>
              <div>1k</div>
              <div>0</div>
            </div>
            <div className="absolute left-8 right-0 top-0 bottom-0">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <path
                  d="M0,200 C20,150 40,250 60,200 C80,150 100,250 120,200 C140,150 160,250 180,200 C200,150 220,250 240,200 C260,150 280,250 300,200 C320,150 340,250 360,200 C380,150 400,250 400,200"
                  fill="none"
                  stroke="blue"
                  strokeWidth="2"
                />
                <path
                  d="M0,100 C20,50 40,150 60,100 C80,50 100,150 120,100 C140,50 160,150 180,100 C200,50 220,150 240,100 C260,50 280,150 300,100 C320,50 340,150 360,100 C380,50 400,150 400,100"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}

