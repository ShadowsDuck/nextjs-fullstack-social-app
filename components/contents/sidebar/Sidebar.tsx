import { LinkIcon, MapPinIcon } from 'lucide-react'
import Link from 'next/link'

import { getUserByClerkId } from '@/app/actions/user.action'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs/server'

import UnAuthenticatedSidebar from './UnAuthenticatedSidebar'

async function Sidebar() {
  const authUser = await currentUser()
  if (!authUser) return <UnAuthenticatedSidebar />

  const user = await getUserByClerkId(authUser.id)
  if (!user) return null

  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-2">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="h-20 w-20 border-2">
                <AvatarImage src={user.image || '/avatar.png'} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-muted-foreground text-sm">{user.username}</p>
              </div>
            </Link>

            {user.bio && <p className="text-muted-foreground mt-3 text-sm">{user.bio}</p>}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-muted-foreground text-xs">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-muted-foreground text-xs">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="text-muted-foreground flex items-center">
                <MapPinIcon className="mr-2 h-4 w-4" />
                {user.location || 'No location'}
              </div>
              <div className="text-muted-foreground flex items-center">
                <LinkIcon className="mr-2 h-4 w-4 shrink-0" />
                {user.website ? (
                  <a href={`${user.website}`} className="truncate hover:underline" target="_blank">
                    {user.website}
                  </a>
                ) : (
                  'No website'
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Sidebar
