import Header from '@/components/user/home/header'
import MessagingPage from '@/components/user/messaging/message-page'
import React from 'react'

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