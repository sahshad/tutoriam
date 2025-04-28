import PageHeader from '@/components/instructor/common/Header'
import { Sidebar } from '@/components/instructor/common/Sidebar'
import MessagingPage from '@/components/user/messaging/message-page'
import { createChat } from '@/services/chatService'
import { useEffect, useState } from 'react'

const InstructorMessagesPage = () => {
      const [sidebarOpen, setSidebarOpen] = useState(false)
    
    //   useEffect(()=> {
    //     async function cr() {
    //         await createChat('67e4d39f83684a114d6f36ef')
    //     }
    //     cr()

    //   },[])
  return (
    <div className="flex h-screen bg-background">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <PageHeader />
          <main className="flex-1 overflow-y-auto p-6 pb-16 no-scrollbar">
            <div className=" items-center justify-center ">
                <MessagingPage/>
              {/* <div className="animate-pulse">Loading course details...</div> */}
            </div>
          </main>
        </div>
      </div>
  )
}

export default InstructorMessagesPage