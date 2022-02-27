import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Home from './Home'
import Layout from './Layout'
import Overviewer from './Overviewer'
import Profile from './Profile'

export default function Navigation() {
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout redirect='/dashboard' />}>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Auth formType='register' />} />
          <Route path='/login' element={<Auth formType='login' />} />
        </Route>
        <Route element={<Layout restricted redirect='/' />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/overviewer' element={<Overviewer />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}