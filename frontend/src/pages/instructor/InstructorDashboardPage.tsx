import type React from "react";
import { useEffect, useState } from "react";
import {
  BarChart,
  LineChart,
  Star,
  Users,
  BookOpen,
  DollarSign,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/instructor/common/Sidebar";
import { RevenueStats } from "@/components/instructor/earnings/revenue-stats";
import { Wallet } from "@/types/wallet";
import { fetchInstructorWallet } from "@/services/earningService";
import { RevenueChart } from "@/components/instructor/earnings/revenue-chart";
import { fetchInstructorRating } from "@/services/reviewService";
import { RatingCard } from "@/components/instructor/dashboard/rating-card";
import { InstructorRating } from "@/types/review";
import { InstructorStats } from "@/types/enrollment";
import { fetchInstructorEnrollemtStats } from "@/services/enrollmentService";
import { fetchActiveCourseCount } from "@/services/courseService";

const InstructorDashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletData, setWalletData] = useState<Wallet | null>(null);
  const [ratings, setRatings] = useState<InstructorRating | null>(null);
  const [enrollmentStats, setEnrollmentStats] = useState<InstructorStats>()
  const [activeCourse, setActiveCourse] = useState<string>("0")

  useEffect(() => {
    getDahsboardData();
  }, []);

  const getDahsboardData = async () => {
    try {
      const walletData = await fetchInstructorWallet();
      setWalletData(walletData.wallet);
      const ratingData = await fetchInstructorRating();
      setRatings(ratingData.instructorRating)
      const enrollmentData = await fetchInstructorEnrollemtStats()
      setEnrollmentStats(enrollmentData.enrollmentStats)
      const activeCourseData = await fetchActiveCourseCount()
      setActiveCourse(activeCourseData.activeCourses)

    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <div>
              <h2 className="text-sm font-medium">Good Morning</h2>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="h-9 w-64 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  3
                </span>
              </button>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>VS</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 pb-16">
          {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              icon={<Layers className="h-5 w-5 text-primary" />}
              title="957"
              subtitle="Enrolled Courses"
            />
            <StatsCard 
              icon={<BookOpen className="h-5 w-5 text-primary" />}
              title="19"
              subtitle="Active Courses"
            />
            <StatsCard 
              icon={<User className="h-5 w-5 text-primary" />}
              title="241"
              subtitle="Course Instructors"
            />
            <StatsCard 
              icon={<Layers className="h-5 w-5 text-primary" />}
              title="951"
              subtitle="Completed Courses"
            />
          </div> */}

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard icon={<Users className="h-5 w-5 text-primary" />} title={enrollmentStats?.studentCount.toString() as string} subtitle="Students" />
            <StatsCard icon={<BookOpen className="h-5 w-5 text-primary" />} title={activeCourse} subtitle="Online Courses" />
            <StatsCard
              icon={<DollarSign className="h-5 w-5 text-primary" />}
              title={`₹${walletData?.balance.toFixed(2)}`}
              subtitle="USD Total Earning"
            />
            <StatsCard icon={<Layers className="h-5 w-5 text-primary" />} title={enrollmentStats?.coursesSold.toString() as string} subtitle="Course Sold" />
          </div>

          {/* <div className="mt-6">
            <Card className="bg-gray-950 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Vako Shvili" />
                      <AvatarFallback className="text-lg">VS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">Vako Shvili</h3>
                      <p className="text-sm text-gray-400">vako.shvili@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-4 md:justify-end">
                    <div className="flex-1 md:max-w-[200px]">
                      <div className="flex items-center justify-between text-xs">
                        <span>1/4 Steps</span>
                        <span>25% Completed</span>
                      </div>
                      <Progress value={25} className="h-2 mt-1" />
                    </div>
                    <Button variant="outline" className="text-white border-white hover:bg-gray-800">
                      Edit Biography
                    </Button>
                    <Button variant="outline" size="icon" className="text-white border-white hover:bg-gray-800">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
          <div className="mt-5">
            <RevenueStats wallet={walletData} />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Recent Activity</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    Today
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <ActivityItem 
                    name="Kevin"
                    action="comments on your lecture &quot;What is UX&quot; in &quot;2021 uiux design with figma&quot;"
                    time="Just now"
                  />
                  <ActivityItem 
                    name="John"
                    action="gave a 5 star rating on your course &quot;2021 uiux design with figma&quot;"
                    time="3 mins ago"
                  />
                  <ActivityItem 
                    name="Simone"
                    action="purchase your course &quot;2021 uiux design with figma&quot;"
                    time="6 mins ago"
                  />
                  <ActivityItem 
                    name="Arif"
                    action="purchase your course \&quot;2021 uiux design with figma&quot;"
                    time="10 mins ago"
                  />
                </div>
              </CardContent>
            </Card> */}

            {/* <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Revenue</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    This month
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 h-[200px] relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/10 px-2 py-1 rounded text-xs font-medium">
                    $1,749
                  </div>
                  <LineChartPlaceholder />
                </div>
              </CardContent>
            </Card> */}

            {/* <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Profile View</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    Today
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 h-[200px]">
                  <BarChartPlaceholder />
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-bold">$7,443</h4>
                  <p className="text-sm text-muted-foreground">USD Dollar you earned</p>
                </div>
              </CardContent>
            </Card> */}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {ratings && (
              <RatingCard
                averageRating={ratings?.averageRating}
                starPercentages={Object.fromEntries(
                  ratings?.breakdown.map(({ rating, percentage }) => [rating, percentage])
                )}
                totalReviews={ratings.totalReviews}
              />
            )}
            {/* <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Overall Course Rating</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    This week
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-3xl font-bold text-center">4.6</h2>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-xs text-center mt-1 text-muted-foreground">Overall Rating</p>
                  </div>
                  <div className="flex-1 ml-6">
                    <LineChartPlaceholder height={100} />
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <RatingBar stars={5} percentage={58} />
                  <RatingBar stars={4} percentage={37} />
                  <RatingBar stars={3} percentage={8} />
                  <RatingBar stars={2} percentage={1} />
                  <RatingBar stars={1} percentage={0.5} />
                </div>
              </CardContent>
            </Card> */}

            {/* <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Course Overview</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    This week
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 h-[250px]">
                  <MultiLineChartPlaceholder />
                </div>
              </CardContent>
            </Card> */}
            <RevenueChart />
          </div>
        </main>
      </div>
    </div>
  );
};

function StatsCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">{title}</p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ name, action, time }: { name: string; action: string; time: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <span className="text-xs font-bold">{name.charAt(0)}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{name}</span> {action}
        </p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

function RatingBar({ stars, percentage }: { stars: number; percentage: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex w-16 items-center gap-1">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < stars ? "fill-primary text-primary" : "text-muted-foreground"}`} />
        ))}
      </div>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-xs font-medium w-8">{percentage}%</span>
    </div>
  );
}

function LineChartPlaceholder({ height = 200 }: { height?: number }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <LineChart className="h-full w-full text-muted-foreground/50" />
    </div>
  );
}

function BarChartPlaceholder() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <BarChart className="h-full w-full text-muted-foreground/50" />
    </div>
  );
}

function MultiLineChartPlaceholder() {
  return (
    <div className="h-full w-full flex items-center justify-center relative">
      <div className="absolute inset-0 flex flex-col justify-between text-xs text-muted-foreground">
        <div>5k</div>
        <div>4k</div>
        <div>3k</div>
        <div>2k</div>
        <div>1k</div>
        <div>0</div>
      </div>
      <div className="absolute bottom-0 w-full flex justify-between text-xs text-muted-foreground">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <LineChart className="h-full w-full text-muted-foreground/50" />
    </div>
  );
}

export default InstructorDashboardPage;
