import { RootState } from '@/types/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// 参数一：actionFn 异步action函数
// 参数二：stateName redux数据模块名

export function useInitState<StateName extends keyof RootState>(actionFn: () => void, stateName: StateName) {
  const dispatch = useDispatch()
  useEffect(() => {
    // 1. 分发异步action获取数据，存储到redux
    dispatch<any>(actionFn())
  }, [dispatch, actionFn])
  // 2. 从Redux中拿取数据（动态获取用[]）
  const state = useSelector((state: RootState) => state[stateName])
  return state
}
