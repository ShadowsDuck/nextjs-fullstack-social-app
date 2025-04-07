import CreatePost from '@/components/contents/main_content/CreatePost'
import { currentUser } from '@clerk/nextjs/server'

async function Home() {
  const user = await currentUser()
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
      <div className="lg:col-span-6">{user ? <CreatePost /> : null}</div>
      <div className="sticky top-20 hidden lg:col-span-4 lg:block">
        {user ? 'WhoToFollow' : null}
      </div>
    </div>
  )
}
export default Home
