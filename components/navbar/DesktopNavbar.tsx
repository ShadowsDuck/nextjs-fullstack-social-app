import { BellIcon, HomeIcon, UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignInButton, UserButton } from '@clerk/nextjs'
import ModeToggle from '@/components/navbar/ModeToggle'
import { currentUser } from '@clerk/nextjs/server'

async function DesktopNavbar() {
  const user = await currentUser()

  return (
    <div className="hidden items-center space-x-4 md:flex">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="h-4 w-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="h-4 w-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split('@')[0]
              }`}
            >
              <UserIcon className="h-4 w-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  )
}
export default DesktopNavbar
