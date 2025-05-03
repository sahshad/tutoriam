import { useState } from "react";
import { AccountSettings } from "./account-settings";
import { SocialProfile } from "./social-profile";
import { Sidebar } from "../common/Sidebar";
import PageHeader from "../common/Header";

export function AccountSettingsPage() {
      const [sidebarOpen, setSidebarOpen] = useState(false)
    
  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader />
        <div className="flex-1 overflow-y-auto p-6 pb-16 no-scrollbar">
          <div className="space-y-8">
            <AccountSettings />
            <SocialProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
