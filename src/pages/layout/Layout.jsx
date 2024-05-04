import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { Popconfirm, Menu, Layout } from 'antd';
import { fetchUserInfoAsync, clearUserInfo } from '@/store/modules/user';
import './index.scss';


const { Header, Sider } = Layout;
/* slider tag */
const items = [
  {
    label: '首页',
    key: '/layout/home',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/layout/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/layout/publish',
    icon: <EditOutlined />,
  },
]

export default function _Layout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // click quit
  const onConfirm = () => {
    // clear userinfo and redirect login
    dispatch(clearUserInfo());
    navigate('/login');
  }

  // slider menu click
  const onMenuClick = (route) => {
    const { key } = route
    navigate(key);
  }

  // opera user info for asynchronize
  useEffect(() => {
    dispatch(fetchUserInfoAsync())
  }, [])

  // get current route path
  const location = useLocation();
  const { pathname: selectedkey } = location;

  // get name from redux
  const { name } = useSelector(state => state.userReducer.userInfo)
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedkey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* second route to show */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
