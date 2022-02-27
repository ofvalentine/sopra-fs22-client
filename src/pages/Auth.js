import { Heading, VStack } from '@chakra-ui/react'
import { Form } from 'formik'
import { useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { MotionBoxDraw, MotionButton } from '../components/Animations'
import { BasicForm, InputField } from '../components/Forms'

export default function Auth(props) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start('flicker')
  }, [controls])

  return (
    <MotionBoxDraw w='30%' h='60%' animate={controls}>
      <BasicForm withPassword endpoint={props.formType} controls={controls} children={
        (formProps) =>
          <VStack as={Form} h='80%' justify='space-between'>
            <Heading>{props.formType}</Heading>
            <InputField name='username' type='text' />
            <InputField name='password' type='password' />
            <MotionButton glow='orange' type='submit' children='submit' animate='enter' isLoading={formProps.isSubmitting} />
          </VStack>} />
    </MotionBoxDraw>
  )
}
