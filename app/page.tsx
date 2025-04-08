import CreatePost from '@/components/contents/main_content/CreatePost'
import PostCard from '@/components/contents/main_content/PostCard'
import WhoToFollow from '@/components/contents/main_content/WhoToFollow'
import { currentUser } from '@clerk/nextjs/server'
import { getPosts } from './actions/post.action'
import { getDbUserId } from './actions/user.action'

async function Home() {
  const user = await currentUser()
  const posts = await getPosts()
  const dbUserId = await getDbUserId()

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>
      <div className="sticky top-20 hidden lg:col-span-4 lg:block">
        <WhoToFollow />
      </div>
    </div>
  )
}
export default Home
