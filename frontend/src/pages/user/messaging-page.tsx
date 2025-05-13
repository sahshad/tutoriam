import Header from '@/components/user/home/Header'
import MessagingPage from '@/components/user/messaging/message-page'

const MessagePage = () => {
  return (
    <div>
        <Header/>
        <div className='px-[4%]'>
        <MessagingPage/>
        </div>
    </div>
  )
}

export default MessagePage