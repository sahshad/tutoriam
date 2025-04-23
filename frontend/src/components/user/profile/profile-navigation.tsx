import { TabsContent } from '@radix-ui/react-tabs'
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs'
import AccountSettings from './account-settings'
import CoursesPage from '../enrolled-course/enrolled-courses-page'
import PurchaseHistoryContent from '../purchase-history/purchase-history-content'

const ProfileNavigation = () => {
  return (
    <Tabs defaultValue="settings" className="w-full">
          <TabsList className="mb-8 w-full justify-start border-b bg-transparent p-0">
            <TabsTrigger
              value="dashboard"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Courses
            </TabsTrigger>
            {/* <TabsTrigger
              value="teachers"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Teachers
            </TabsTrigger> */}
            <TabsTrigger
              value="message"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Message
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Wishlist
            </TabsTrigger>
            <TabsTrigger
              value="purchase-history"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Purchase History
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* <TabsContent value="dashboard">
        <Dashboard />
      </TabsContent> */}
      <TabsContent value="courses">
        <CoursesPage />
      </TabsContent>
      {/* <TabsContent value="teachers">
        <Teachers />
      </TabsContent>
      <TabsContent value="message">
        <Messages />
      </TabsContent>
      <TabsContent value="wishlist">
        <Wishlist />
      </TabsContent> */}
      <TabsContent value="purchase-history">
        <PurchaseHistoryContent />
      </TabsContent>

          <TabsContent value='settings'>
          <AccountSettings/>
          </TabsContent>

      </Tabs>
  )
}

export default ProfileNavigation
