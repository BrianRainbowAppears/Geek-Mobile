import { Button, NavBar, Form, Input, Toast } from 'antd-mobile'
// React避免样式冲突（同名类名）？使用css module解决
// 1. 给组件新建样式并命名：xxx.module.scss解决
// 2. 给组件导入样式使用：import styles from './xxx/module.scss'
// 3. 在元素上通过差值绑定使用：<div className={styles.类名}>
import styles from './index.module.scss'
import { FormData } from '@/types/data'
import { useDispatch } from 'react-redux'
import { loginAction, sendCodeAction } from '@/store/actions/login'
import { useHistory } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { InputRef } from 'antd-mobile/es/components/input'

const Login = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  const [count, setCount] = useState(0)
  // 通过useRef创建一个Ref对象，用来存储定时器id
  const timerRef = useRef(-1)
  // 登录方法
  const login = async (formData: FormData) => {
    console.log(formData)
    // 登录异常处理 使用try catch 进行捕获
    try {
      await dispatch<any>(loginAction(formData))
      // 登录成功触发轻提示：跳转首页
      Toast.show({
        icon: 'success',
        content: '登陆成功',
        // afterClose方法会在轻提示效果结束后触发
        afterClose: () => {
          history.push('/home')
        }
      })
    } catch (error) {
      // 对于登录操作，出错了通常是请求出问题
      // 因此，此处错误类型可以为 AxiosError 从axios中引入 使用类型断言
      const e = error as AxiosError<{ message: string }>
      console.dir(error)
      // 防止e.response为undefined，此处添加?
      console.log(e.response?.data.message)
      Toast.show({
        icon: 'fail',
        content: e.response?.data.message
      })
    }
  }
  // 发送验证码方法
  const mobileRef = useRef<InputRef>(null)
  const sendCode = async () => {
    /**
     * 需求：
     * 1. 获取手机号并校验格式
     * 2. 校验失败，手机输入栏重新获取焦点=》提示用户重新输入
     * 3. 校验成功=》调用接口发短信
     */
    console.log('获取表单中某项的值：', form.getFieldValue('mobile'))
    console.log('获取表单中某项是否有错误：', form.getFieldError('mobile'))
    const mobile = form.getFieldValue('mobile')
    const hasError = form.getFieldError('mobile').length
    //  当没有输入手机号 || 有错误时  执行
    if (!mobile?.trim() || hasError) {
      console.log('输入框的实例：', mobileRef)
      Toast.show({
        content: '请输入正确的手机号'
      })
      return mobileRef.current?.focus()
    }
    try {
      //  使用异步action获取验证码
      await dispatch<any>(sendCodeAction(mobile))
      //  开启验证码倒计时
      setCount(60)
      // 开启定时器后，将定时器ID存储到Ref对象的current属性中
      // 开启定时器一定要用window.setInterval，这样返回值才是number累心给的数值
      timerRef.current = window.setInterval(() => {
        // 此处会形成闭包，因为内层访问外层的变量，外层的变量会常驻内存：变量私有化
        // 因为setState
        console.log(count)
        setCount(count => {
          console.log(count)
          return count - 1
        })
      }, 1000)
    } catch (error) {
      console.dir(error)
    }
  }
  // 通过useEffect钩子监听count的变化
  useEffect(() => {
    if (count === 0) {
      clearInterval(timerRef.current)
    }
  }, [count])

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])
  return (
    <div className={styles.root}>
      <NavBar>标题</NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form form={form} onFinish={login} validateTrigger={['onBlur']}>
          <Form.Item
            name="mobile"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误'
              }
            ]}
            className="login-item"
          >
            <Input ref={mobileRef} placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              {
                max: 6,
                min: 6,
                message: '验证码长度错误'
              }
            ]}
            className="login-item"
            extra={
              // 判断是否开启定时器，没开启绑定时间，开启后去掉事件
              <span onClick={count === 0 ? sendCode : undefined} className="code-extra">
                {/* 判断是否开启定时器，没开启展示发送验证码，开启后展示倒计时 */}
                {count === 0 ? '发送验证码' : `${count}秒后可重新发送`}
              </span>
            }
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item shouldUpdate noStyle>
            {/* <Button block type="submit" color="primary" className="login-submit">
              登 录
            </Button> */}
            {() => {
              console.log('是否输入过：', form.isFieldsTouched(true))
              console.log('表单错误信息：', form.getFieldsError())
              return (
                <Button
                  block
                  type="submit"
                  color="primary"
                  className="login-submit"
                  disabled={
                    !form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  登 录
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
