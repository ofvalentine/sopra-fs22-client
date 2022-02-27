import { CheckIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Field, Formik } from 'formik'
import React from 'react'
import { DatePicker } from 'react-rainbow-components'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFetch } from 'use-http'
import { object, string } from 'yup'

export function InputField(props) {
  return (
    <Field name={props.name} children={fieldProps =>
      <FormControl isRequired isReadOnly={props.readOnly} isInvalid={fieldProps.meta.touched && !!fieldProps.meta.error}>
        <FormLabel>{props.name}</FormLabel>
        <InputGroup w='25vw'>
          <Input {...fieldProps.field} type={props.type} autoComplete='new-password'/>
          <InputRightElement>
            {!props.readOnly && fieldProps.meta.touched && !fieldProps.meta.error && <CheckIcon color='green.500'/>}
          </InputRightElement>
        </InputGroup>
        <Box h='2vh' color={fieldProps.meta.error ? 'red.400' : 'green.500'}>
          {fieldProps.meta.touched && fieldProps.meta.error}
        </Box>
      </FormControl>}/>
  )
}

export function DateField(props) {
  return (
    <Field name={props.name} children={fieldProps =>
      <FormControl isInvalid={fieldProps.meta.touched && !!fieldProps.meta.error}>
        <FormLabel>{props.name}</FormLabel>
        <Box as={DatePicker} w='25vw' maxDate={new Date()} placeholder='Select date...' {...props} />
      </FormControl>} />
  )
}

export function BasicForm(props) {
  const { get, put, response } = useFetch({ cachePolicy: 'no-cache' })
  const { loggedUser, setLoggedUser } = useOutletContext()
  const initialValues = { username: loggedUser?.username || '', password: '', birthday: loggedUser?.birthday }
  const validationSchema = object({
    password: props.withPassword && string().required(),
    username: string().required().min(3, 'username is too short').max(15, 'username is too long')
                      .test('is-available', (context) => `username ${context.originalValue} is not available`, async (username) =>
                        (props.endpoint === 'login') || (username === loggedUser?.username) || await get(`/users/validate/${username}`))
  })

  const onSubmit = async (values, actions) => {
    const userData = await put(`/users/${props.endpoint}`, values)
    if (response.ok) {
      setLoggedUser({ ...loggedUser, ...values, ...userData })
      if (props.onSuccess)
        props.onSuccess()
      toast.success('All done!', { position: 'top-center', autoClose: 7000, theme: 'dark' })
    } else {
      toast.error(
        userData.message || 'Request failed, please try again',
        { position: 'top-center', autoClose: 7000, theme: 'colored' })
      actions.setFieldValue('password', '')
      if (props.controls)
        await props.controls.start('error')
    }
  }

  return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}
                 validateOnChange={false} children={props.children} />
}
