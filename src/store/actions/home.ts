import { Channel, UserChannelResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { differenceBy } from 'lodash'

// 获取用户频道数据
// 1. 已登录：获取当前用户的频道数据
// 2. 未登录：获取系统默认的频道数据
export const getUserChannelAction = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const { data }: UserChannelResponse = await request.get('/user/channels')
    console.log('用户频道数据：', data)

    dispatch({ type: 'getUserChannel/home', payload: data.channels })
  }
}

// 获取所有频道数据
export const getAllChannelAction = (): RootThunkAction => {
  return async (dispatch, getState) => {
    // 1. 所有频道数据
    const { data }:UserChannelResponse = await request.get('/channels')
    console.log('所有频道数据：', data.channels)
    // 2. 用户频道数据
    const { userChannel } = getState().homeReducer
    console.log('用户频道数据：', userChannel);
    
    // 3. 推荐频道数据
    // 第三个参数唯一标识符必填！不填报错，一般是id
    const restChannel = differenceBy(data.channels, userChannel, 'id')
    console.log('推荐频道数据：', restChannel)

    dispatch({ type: 'getRestChannel/home', payload:restChannel})
  }
}

// 删除频道
export const delChannelAction = (channel: Channel): RootThunkAction => {
  return async(dispatch,getState)=>{
    await request.delete(`/user/channels/${channel.id}`)
    dispatch({ type:'delChannel/home' , payload: channel})
  }
}
// 添加频道
export const addChannelAction = (channel: Channel) : RootThunkAction => {
  return async(dispatch,getState)=>{
    await request.patch('/user/channels', {channels: [channel]})
    dispatch({ type: 'addChannel/home', payload: channel})
  }
}