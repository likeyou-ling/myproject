import { _getToken } from '@/utils'
import React from 'react'
import { Navigate } from 'react-router-dom';

// 封装拦截路由组件，检测当前跳转是否存在token
export default function AuthRoute({ children }) {
    const token = _getToken();
    return token ? <>{children}</> : <Navigate to="/login" replace={true}></Navigate>
}
