import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { ButtonGroup, Heading, VStack } from '@chakra-ui/react'
import { Form } from 'formik'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { MotionBoxDraw, MotionButton } from '../components/Animations'
import { BasicForm, DateField, InputField } from '../components/Forms'

export default function Profile() {
  const { loggedUser } = useOutletContext()
  const [readOnly, setReadOnly] = useState(true)
  const toReadOnly = () => setReadOnly(true)

  return (
    <MotionBoxDraw h='50%' w='50%' p={4}>
      <BasicForm endpoint={loggedUser.id} onSuccess={toReadOnly} children={
        (formProps) =>
          <VStack as={Form} h='80%' justify='space-between'>
            <Heading>my profile</Heading>
            {(readOnly
              ? <MotionButton rightIcon={<EditIcon/>} children='edit' onClick={() => setReadOnly(false)} />
              : <ButtonGroup justifyContent='center'>
                  <MotionButton glow='green' rightIcon={<CheckIcon/>} type='submit' children='save' />
                  <MotionButton glow='orange' rightIcon={<CloseIcon/>} type='reset' children='discard'
                                onClick={() => {formProps.handleReset(); setReadOnly(true)}} />
                </ButtonGroup>)}
            <InputField name='username' type='text' readOnly={readOnly} />
            <DateField name='birthday' readOnly={readOnly} value={formProps.values.birthday}
                     onChange={selectedDate => formProps.setFieldValue('birthday', selectedDate)} />
          </VStack>} />
    </MotionBoxDraw>
  )
}
