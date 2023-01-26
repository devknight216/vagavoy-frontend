import { Avatar } from '@mui/material'
import TextField from '@mui/material/TextField'
import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from 'src/hooks'
import { addDirectMessage } from 'src/store/reducers/messageSlice'
import { RootState, useAppDispatch } from 'src/store/store'

export const MessagePanel = memo(() => {
  const { user, socket } = useAuth()
  const [message, setMessage] = useState<string>('')
  const { messages, activeAddress, directMessages } = useSelector(
    (state: RootState) => state.message
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.on('message', (data: any) => {
      console.log('direct message', data)
      handleDirectMessage(data, false)
    })
    socket.on('report', (data: any) => {
      console.log('report message', data)
      handleDirectMessage(data, true)
    })
    socket.on('quitUser', (data: any) => {
      console.log('one user out!', data.userId)
    })
    return () => {
      socket.off('message')
      socket.off('report')
      socket.off('quitUser')
    }
  }, [user])

  const handleDirectMessage = (data: any, direction: boolean): void => {
    console.log(data)
    dispatch(addDirectMessage({ ...data, direction }))
  }

  const handleChange = (e: any): void => {
    setMessage(e.target.value)
  }
  const handleSendMessage = (): void => {
    console.log('handleSendMessage')
    if (activeAddress) {
      socket.emit('message', {
        senderId: user.id,
        receiverId: activeAddress.id,
        content: message,
        name: user.name,
        avatar: user.profileImage
      })
    }
  }
  return (
    <div className="relative min-h-[calc(100%-190px)] md:min-h-[calc(100%-207px)] pl-[16px] md:pl-[32px] pr-[16px] md:pr-[32px] pt-5">
      {messages.length > 0 &&
        messages.map((messageGroup: any, index: number) => (
          <div key={'messageGroup' + index}>
            <div className="flex items-center justify-center mb-5 pr-[35px] md:pr-[20px]">
              <hr className="w-[88px]" />
              <p className=" pl-[16px] pr-[16px] text-[14px] text-[#707268]">
                {messageGroup.date}
              </p>
              <hr className="w-[88px]" />
            </div>
            {messageGroup.messagePack.length > 0 &&
              messageGroup.messagePack.map(
                (messagePack: any, index: number) => {
                  if (messagePack.direction)
                    return (
                      <div
                        key={'messagePack' + index}
                        className="flex items-start justify-end">
                        <div className="mr-[16px]">
                          {messagePack.message.length > 0 &&
                            messagePack.message.map(
                              (item: any, index1: number) => (
                                <div
                                  key={'message' + index1}
                                  className="flex justify-end">
                                  <p className="m-0 mb-[8px] bg-[#003300] opacity-50 rounded-[25px] pl-[16px] pr-[16px] pt-[10px] pb-[10px] text-[18px] text-white">
                                    {item.content}
                                  </p>
                                </div>
                              )
                            )}
                        </div>
                        <Avatar
                          src={user.profileImage}
                          sx={{ width: '44px', height: '44px' }}
                        />
                      </div>
                    )
                  else
                    return (
                      <div
                        key={'messagePack' + index}
                        className="flex items-start justify-start">
                        <Avatar
                          src={activeAddress?.avatar}
                          sx={{ width: '44px', height: '44px' }}
                        />
                        <div className="ml-[16px]">
                          {messagePack.message.length > 0 &&
                            messagePack.message.map(
                              (item: any, index1: number) => (
                                <div key={'message' + index1} className="flex">
                                  <p className="m-0 mb-[8px] bg-[#E5E8DB] rounded-[25px] pl-[16px] pr-[16px] pt-[10px] pb-[10px] text-[18px] text-[#003300]">
                                    {item.content}
                                  </p>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    )
                }
              )}
          </div>
        ))}
      {directMessages.length > 0 && (
        <div>
          <div className="flex items-center justify-center mb-5 pr-[35px] md:pr-[20px]">
            <hr className="w-[88px]" />
            <p className=" pl-[16px] pr-[16px] text-[14px] text-[#707268]">
              {directMessages[0].message[0].time.split('T')[0]}
            </p>
            <hr className="w-[88px]" />
          </div>
          {directMessages.map((messagePack: any, index: number) => {
            if (messagePack.direction)
              return (
                <div
                  key={'messagePack' + index}
                  className="flex items-start justify-end">
                  <div className="mr-[16px]">
                    {messagePack.message.length > 0 &&
                      messagePack.message.map((item: any, index1: number) => (
                        <div
                          key={'message' + index1}
                          className="flex justify-end">
                          <p className="m-0 mb-[8px] bg-[#003300] opacity-50 rounded-[25px] pl-[16px] pr-[16px] pt-[10px] pb-[10px] text-[18px] text-white">
                            {item.content}
                          </p>
                        </div>
                      ))}
                  </div>
                  <Avatar src={user.profileImage} sx={{ width: '44px' }} />
                </div>
              )
            else
              return (
                <div
                  key={'messagePack' + index}
                  className="flex items-start justify-start">
                  <Avatar src={activeAddress?.avatar} sx={{ width: '44px' }} />
                  <div className="ml-[16px]">
                    {messagePack.message.length > 0 &&
                      messagePack.message.map((item: any, index1: number) => (
                        <div key={'message' + index1} className="flex">
                          <p className="m-0 mb-[8px] bg-[#E5E8DB] rounded-[25px] pl-[16px] pr-[16px] pt-[10px] pb-[10px] text-[18px] text-[#003300]">
                            {item.content}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )
          })}
        </div>
      )}

      <div className="absolute left-0 bottom-[-127px] flex flex-wrap justify-between w-full h-[127px] bg-[#E5E8DB] pl-5 pt-5 pr-5">
        <TextField
          multiline
          rows={4}
          defaultValue=""
          placeholder="Type your Message Here..."
          variant="standard"
          sx={{ width: '80%' }}
          onChange={(e) => handleChange(e)}
        />
        <div
          className="flex items-center justify-center w-[69px] h-[36px] bg-[#003300] text-white rounded-[50px] text-[16px] cursor-pointer"
          onClick={() => handleSendMessage()}>
          Send
        </div>
      </div>
    </div>
  )
})
