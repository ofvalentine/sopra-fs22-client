import { Divider, Heading, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { CachePolicies, useFetch } from 'use-http'
import { MotionBoxDraw, MotionButton } from '../components/Animations'

export default function Dashboard() {
  const { put } = useFetch({ cache: CachePolicies.NO_CACHE })
  const { loggedUser, setLoggedUser } = useOutletContext()
  const navigate = useNavigate()

  const logout = async () => {
    await put(`/users/${loggedUser.id}`, { ...loggedUser, loggedIn: false })
    await setLoggedUser(undefined)
    navigate('/')
    return <Spinner />
  }

  return (
    <MotionBoxDraw h='70%' w='70%' spacing={10}>
      <Heading my={5}>{`welcome, ${loggedUser.username}`}</Heading>
      <MotionButton size='large' to='/profile/'>my profile</MotionButton>
      <MotionButton size='large' to='/overviewer'>all users</MotionButton>
      <Divider />
      <MotionButton glow='orange' onClick={logout}>logout</MotionButton>
    </MotionBoxDraw>
  )
}
