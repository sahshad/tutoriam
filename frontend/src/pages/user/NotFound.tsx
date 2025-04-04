import { Button } from "@/components/ui/button"
import Header from "@/components/user/home/Header"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
        <Header/>
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 gap-8">
        <div className="max-w-md">
          <h1 className="text-7xl font-light text-gray-300 mb-2">Error 404</h1>
          <h2 className="text-3xl font-bold mb-4">Oops! page not found</h2>
          <p className="text-gray-600 mb-8">
            Something went wrong. It's look that your requested could not be found. It's look like the link is broken or
            the page is removed.
          </p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link to="/">Go Back</Link>
          </Button>
        </div>
        <div className="relative">
          {/* <img src="/placeholder.svg?height=400&width=500" alt="404 Error Illustration" className="max-w-full h-auto" /> */}
        </div>
      </div>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row justify-between items-center px-6">
          <p>© 2025 - Tutoriam. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="#" className="hover:underline">
              FAQs
            </Link>
            <Link to="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:underline">
              Terms & Condition
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

