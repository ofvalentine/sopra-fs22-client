import {
  Badge,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tooltip,
  Tr,
  useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { CachePolicies, useFetch } from 'use-http'
import { MotionBoxDraw, MotionButton, MotionWrap } from '../components/Animations'

export default function Overviewer() {
  const users = useFetch('/users', { data: [], cachePolicy: CachePolicies.NO_CACHE }, []).data
  const { loggedUser } = useOutletContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [selectedUser, setSelectedUser] = useState(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 36

  function UserModal() {
    return (
      <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
        <ModalOverlay bg='none' />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Table>
              <Tbody>
                <Tr>
                  <Td>username</Td>
                  <Td>{selectedUser?.username}</Td>
                </Tr>
                <Tr>
                  <Td>status</Td>
                  <Td>
                    <Badge colorScheme={selectedUser?.loggedIn ? 'green' : 'red'}>
                      {`${selectedUser?.loggedIn ? 'On' : 'Off'}line`}
                    </Badge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>creation date</Td>
                  <Td>{selectedUser?.creationDate}</Td>
                </Tr>
                <Tr>
                  <Td>birthday</Td>
                  <Td>{selectedUser?.birthday || <Badge>undefined</Badge>}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Center my={4}>
              {selectedUser?.id === loggedUser.id &&
                <MotionButton onClick={() => {onClose(); navigate('/profile')}}>
                  edit profile
                </MotionButton>}
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <Center h='100vh'>
      <MotionBoxDraw h='65vh' w='82vw' p={4}>
        <Heading mt={3}>users overview</Heading>
        <MotionWrap h='full' w='full' p={6}>
        {users.slice((currentPage-1)*usersPerPage, currentPage*usersPerPage).map(user =>
          <MotionButton key={user.id} fontSize='2vh' glow={user.loggedIn ? 'green' : 'orange'} h='8vw' w='8vw' p={1} overflow='hidden'
                        textOverflow='ellipsis' whiteSpace='nowrap' display='inline' onClick={() => {setSelectedUser(user); onOpen()}} >
            <Tooltip label={user.username}>
              {user.username}
            </Tooltip>
           </MotionButton>
        )}
        </MotionWrap>
        <MotionWrap spacing={6} position='absolute' bottom='8vh'>
          {[...Array(Math.ceil(users.length / usersPerPage)+1).keys()].slice(1).map(pageNum =>
            <MotionButton rounded='full' w='5vh' h='5vh' key={pageNum} children={pageNum} glow='minimal'
                          onClick={() => setCurrentPage(pageNum)} isActive={pageNum === currentPage} />)}
        </MotionWrap>
        <UserModal />
      </MotionBoxDraw>
    </Center>
  )
}