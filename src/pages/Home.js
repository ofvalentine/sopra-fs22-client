import React from 'react'
import { MotionBox, MotionButton, MotionHeading } from '../components/Animations'

export default function Home() {
  return (
    <MotionBox h='50vh' w='50vh' enter='reshape'>
      <MotionHeading my={3}>Users Overviewer</MotionHeading>
      <MotionButton size='large' to='/register'>register</MotionButton>
      <MotionButton size='large' to='/login'>login</MotionButton>
    </MotionBox>
  )
}