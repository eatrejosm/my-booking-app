import React, { useEffect, useState } from 'react'
import './Layout.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logoImage from '../../assets/sm.png'

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [sidebarMenu, setSidebarMenu] = useState([])
  const { user } = useSelector((state) => state.user)
  const currentTab = useLocation()
  const navigate = useNavigate()

  const userMenu = [
    {
      name: 'Home',
      icon: 'ri-home-line',
      link: '/home',
    },
    {
      name: 'Book your next class',
      icon: 'ri-file-list-line',
      link: '/appointments',
    },
    {
      name: 'Apply to be a student',
      icon: 'ri-user-2-line',
      link: '/apply-student',
    },
    {
      name: 'My profile',
      icon: 'ri-account-circle-line',
      link: '/profile',
    },
  ]
  const adminMenu = [
    {
      name: 'Home',
      icon: 'ri-home-line',
      link: '/home',
    },
    {
      name: 'Users',
      icon: 'ri-file-list-line',
      link: '/users',
    },
    {
      name: 'Students',
      icon: 'ri-user-2-line',
      link: '/professor',
    },
  ]

//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       setCollapsed(true)
//     }
//   }, [])

  useEffect(() => {
    const userRoleSideMenu = user && user.isAdmin ? adminMenu : userMenu
    setSidebarMenu(userRoleSideMenu)
  }, [user])

  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className={`${collapsed ? 'collapsed-sidebar' : 'sidebar'}`}>
          <div className="sidebar-header">
            <div className="logo-container">
              <div
                className="logo"
                style={{ backgroundImage: `url(${logoImage})` }}
              ></div>
            </div>
          </div>
          <div className="sidebar-menu">
            {sidebarMenu.map((menu, index) => {
              const isActive = currentTab.pathname === menu.link
              return (
                <div
                  className={`d-flex menu-option ${
                    isActive && 'active-menu-option'
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && (
                    <Link key={index} to={menu.link}>
                      {menu.name}
                    </Link>
                  )}
                </div>
              )
            })}
            <div
              className={`d-flex menu-option `}
              onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="header-content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-fill header-icon "
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-menu-2-fill header-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex justify-content-end items-center">
              <i className="ri-notification-2-fill header-icon px-3 mt-2"></i>
              {user && user.name ? (
                <Link className="anchor mt-2" to="/profile">
                  {user.name}
                </Link>
              ) : (
                <Link className="anchor mt-2" to="/login">
                  User
                </Link>
              )}
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
