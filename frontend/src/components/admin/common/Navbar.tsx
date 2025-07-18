import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";
import ThemeToggle from "@/components/common/ThemeToggle";
import TutoriamLogo from "@/components/common/tutoriam-logo";
import NotificationPopover from "@/components/common/notification-popover";

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-2 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 pt-10">
            <MobileSidebar />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2 font-semibold">
            <TutoriamLogo text size={34} />
        </div>
      </div>
      <div className="hidden flex-1 md:flex md:max-w-md md:px-6">
        <div className="relative w-full"></div>
      </div>
      <div className="flex items-center gap-2">
        <NotificationPopover />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
