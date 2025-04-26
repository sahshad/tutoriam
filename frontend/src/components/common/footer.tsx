import { Button } from "@/components/ui/button"
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter, Youtube} from "lucide-react"
import { Link } from "react-router-dom"

export function DashboardFooter() {
  return (
    <footer className="border-t px-[3%]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">tutoriam</h2>
            <p className="text-gray-400 text-sm mb-6">
              Aliquam rhoncus ligula est, non pulvinar est convallis nec. Donec mattis odio sit.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Youtube size={18} />} />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium mb-4">TOP 4 CATEGORY</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Development</FooterLink>
              <FooterLink href="#">Finance & Accounting</FooterLink>
              <FooterLink href="#">Design</FooterLink>
              <FooterLink href="#">Business</FooterLink>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">QUICK LINKS</h3>
            <ul className="space-y-3">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">
                <div className="flex items-center justify-between">
                  <span>Become Instructor</span>
                  <ArrowRight size={14} />
                </div>
              </FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Career</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-4">SUPPORT</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">FAQs</FooterLink>
              <FooterLink href="#">Terms & Condition</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-sm">
          © 2025 - Tutoriam. All rights reserved
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full h-8 w-8 bg-transparent "
    >
      {icon}
    </Button>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={href} className=" transition-colors duration-200 text-sm">
        {children}
      </Link>
    </li>
  )
}
