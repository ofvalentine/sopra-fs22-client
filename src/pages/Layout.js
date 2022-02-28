import { Center } from '@chakra-ui/react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { CachePolicies, useFetch } from 'use-http'
import useLocalStorage from 'use-local-storage'

export default function Layout(props) {
  const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', undefined)
  const { get, put, response } = useFetch({ cachePolicy: CachePolicies.NO_CACHE })
  const context = { loggedUser, setLoggedUser, get, put, response }

  if (props.restricted !== loggedUser?.loggedIn)
    return <Navigate to={props.redirect} />

  return (
    <Center overflow='hidden' h='100vh'>
      <ToastContainer />
      <Outlet context={context} />
    </Center>
  )
}