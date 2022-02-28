import { Center } from '@chakra-ui/react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import useLocalStorage from 'use-local-storage'

export default function Layout(props) {
  const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', undefined)

  if (props.restricted !== loggedUser?.loggedIn)
    return <Navigate to={props.redirect} />

  return (
    <Center overflow='hidden' h='100vh'>
      <ToastContainer />
      <Outlet context={{ loggedUser, setLoggedUser }} />
    </Center>
  )
}