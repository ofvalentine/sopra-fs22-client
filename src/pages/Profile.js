import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { ButtonGroup, Heading, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CachePolicies, useFetch } from 'use-http'
import { object } from 'yup'
import { MotionBoxDraw, MotionButton } from '../components/Animations'
import { DateField, InputField, usernameSchema } from '../components/Fields'

export default function Profile() {
  const { loggedUser, setLoggedUser } = useOutletContext()
  const { put, post, response } = useFetch({ cachePolicy: CachePolicies.NO_CACHE })
  const [readOnly, setReadOnly] = useState(true)

  const onValidateUsername = async (username) =>
    (username === loggedUser?.username) || await post('/users/validate', { username })

  const onSubmit = async (values) => {
    const update = await put(`/users/${loggedUser.id}`, values)
    if (response.ok) {
      setLoggedUser({ ...loggedUser, ...values })
      setReadOnly(true)
    } else {
      toast.error(
        update.message || 'Update failed, please try again',
        { position: 'top-center', theme: 'colored' })
    }
  }
  const onReset = (values, actions) => {
    setReadOnly(true)
    actions.setValues(initialValues)
  }

  const initialValues = { username: loggedUser.username, birthday: loggedUser.birthday }
  const validationSchema = object({ username: usernameSchema(onValidateUsername) })

  return (
    <MotionBoxDraw h='50%' w='50%' p={4}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} onReset={onReset} validationSchema={validationSchema}>
        {(formProps) =>
          <VStack as={Form} h='80%' justify='space-between'>
            <Heading>my profile</Heading>
            {(readOnly
              ? <MotionButton rightIcon={<EditIcon/>} onClick={() => setReadOnly(false)}>edit</MotionButton>
              : <ButtonGroup justifyContent='center'>
                  <MotionButton glow='green' rightIcon={<CheckIcon/>} type='submit'>save</MotionButton>
                  <MotionButton glow='orange' rightIcon={<CloseIcon/>} type='reset'>discard</MotionButton>
                </ButtonGroup>)}
            <InputField name='username' type='text' readOnly={readOnly} />
            <DateField name='birthday' readOnly={readOnly} value={formProps.values.birthday}
                     onChange={selectedDate => formProps.setFieldValue('birthday', selectedDate)} />
          </VStack>}
      </Formik>
    </MotionBoxDraw>
  )
}
