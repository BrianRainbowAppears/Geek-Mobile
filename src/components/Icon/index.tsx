// 封装组件要点：
// 1. 准备组件的复用结构和样式
// 2. 设计props属性（api）=> 复用最大化
import classNames from 'classnames'
// 参数 Props 类型样式
type Props = {
  type: string  // 控制显示不同图标
  className?: string  // 控制图标样式
  onClick?: () => void  // 点击图标执行的回调函数
}

// 解构参数：Props 赋予类型样式
function Icon({ type, className, onClick }: Props) {
  return (
    <svg onClick={onClick} className={classNames('icon', className)} aria-hidden="true">
      {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
      {/* <use xlinkHref="#iconbtn_collect_sel"></use> */}
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

export default Icon
