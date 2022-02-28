import { Heading, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CachePolicies, useFetch } from 'use-http'
import { object, string } from 'yup'
import { MotionBoxDraw, MotionButton } from '../components/Animations'
import { InputField, usernameSchema } from '../components/Fields'

export default function Auth(props) {
  const { post, response } = useFetch({ cachePolicy: CachePolicies.NO_CACHE })
  const { setLoggedUser } = useOutletContext()
  const controls = useAnimation()

  useEffect(() => {
    controls.start('flicker')
  }, [controls])

  const onValidateUsername = async (username) =>
    (props.formType === 'login') || await post('/users/validate', { username })

  const onSubmit = async (values, actions) => {
    const user = await post(`/users/${props.formType}`, values)
    if (response.ok) {
      setLoggedUser(user)
    } else {
      toast.error(
        user.message || `Failed to ${props.formType}, please try again`,
        { position: 'top-center', theme: 'colored' })
      actions.setFieldValue('password', '')
      await controls.start('error')
    }
  }

  const initialValues = { username: '', password: '' }
  const validationSchema = object({ password: string().required(), username: usernameSchema(onValidateUsername) })

  return (
    <MotionBoxDraw w='30%' h='60%' animate={controls}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formProps) =>
          <VStack as={Form} h='80%' justify='space-between'>
            <Heading>{props.formType}</Heading>
            <InputField name='username' type='text' />
            <InputField name='password' type='password' />
            <MotionButton glow='orange' type='submit' animate='enter' isLoading={formProps.isSubmitting}>
              submit
            </MotionButton>
          </VStack>}
      </Formik>
    </MotionBoxDraw>
  )
}
