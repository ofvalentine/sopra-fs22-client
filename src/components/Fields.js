import { CheckIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { DatePicker } from 'react-rainbow-components'
import { string } from 'yup'

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

const usernameSchema = (onValidateUsername) =>
  string().ensure().required().trim().min(3, 'username is too short').max(15, 'username is too long')
          .test('is-available', (context) => `username ${context.originalValue} is not available`, onValidateUsername)

export { usernameSchema }