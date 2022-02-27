import { Button, Heading, VStack, Wrap } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MotionBoxBase = motion(VStack)
const MotionWrapBase = motion(Wrap)
const MotionHeadingBase = motion(Heading)
const MotionButtonBase = motion(Button)

const boxVariants = {
  'initial': { opacity: 0 },
  'flicker': { opacity: 1, boxShadow: 'inset 0 0 20px 6px #ff09ca, 0 0 50px 5px #f000ff',
    transition: { delay: 3, type: 'spring', bounce: 1, duration: 0.8, delayChildren: 4, staggerChildren: 0.5 } },
  'reshape': { opacity: [1,1,1,1,1,1], scale: [0.5,1.2,1.2,0.4,0.6,1], rotate: [0,0,270,270,0,0],
    borderRadius: ['20%','20%','50%','50%','20%','10%'],
    transition: { duration: 4, times: [0,0.2,0.4,0.6,0.8,1], delayChildren: 4.8, staggerChildren: 0.5 } },
  'error': { background: ['#b33737','#b33737','#b33737','#b33737','#b33737','#b33737', '#fff0'],
    rotate: [-2,2,-2,2,-2,2,-2,2,-2,2,-2,2,-2,2,-2,2,0], transition: { duration: 0.8 } },
  'exit': { scale: 0.5, opacity: 0, transition: { duration: 1.5, ease: [0.43,0.13,0.23,0.96] } }
}

const outlineVariants = { initial: { pathLength: 0, opacity: 0 }, enter: { pathLength: 1, opacity: 0.6 } }
const itemVariants = { initial: { opacity: 0 }, enter: { opacity: 1 }, exit: { opacity: 0 } }

const hoverStyles = {
  'pink': { borderColor: '#cf0eff', boxShadow: 'inset 0 0 20px 0 #ff09ca',
    whileHover: { boxShadow: 'inset 0 0 20px 3px #ff09ca, 0 0 50px 5px #f000ff' } },
  'orange': { borderColor: '#d93232', boxShadow: 'inset 0 0 20px 0 #ff0909',
    whileHover: { boxShadow: 'inset 0 0 20px 2px #ff0909, 0 0 30px 3px #ff9200' } },
  'green': { borderColor: '#7abe0d', boxShadow: 'inset 0 0 20px 0 #6cc221',
    whileHover: { boxShadow: 'inset 0 0 20px 2px #6cc221, 0 0 30px 3px #bcf28d' } },
  'minimal': { boxShadow: 'inset 0 0 20px 0 #5a565a', _selected: { borderColor: '#ffffff', boxShadow: 'inset 0 0 20px 0 #ff09ca' },
    whileHover: { boxShadow: 'inset 0 0 20px 2px #5a565a, 0 0 30px 3px #eaeaea' } }
}

export function MotionBoxDraw(props) {
  return (
    <>
      <motion.svg width={props.w} height={props.h} style={{ position: 'absolute' }}>
        <motion.rect width='99.5%' height='99.5%' x='2' y='2' rx='80px' ry='80px' strokeLinecap='round' strokeWidth={3}
                     stroke='#ff09ca' fill='transparent' initial='initial' animate='enter' exit='initial' variants={outlineVariants}
                     transition={{ pathLength: { duration: 3 }, opacity: { duration: 0.01 } }} />
      </motion.svg>
      <MotionBox {...props} enter='flicker' />
    </>
  )
}

export function MotionBox(props) {
  return <MotionBoxBase justify='center' boxShadow='inset 0 0 20px 6px #ff09ca, 0 0 50px 5px #f000ff, 0 0 4px 3px #bbeef7'
                        rounded='80px' initial='initial' animate='enter' exit='exit'
                        variants={{ ...boxVariants, enter: boxVariants[props.enter] }} {...props} />
}

export function MotionWrap(props) {
  return <MotionWrapBase variants={itemVariants} {...props} />
}

export function MotionHeading(props) {
  return <MotionHeadingBase variants={itemVariants} {...props} />
}

export function MotionButton(props) {
  const navigate = useNavigate()
  return <MotionButtonBase variant='outline' border='3px solid' size='small' {...hoverStyles[props.glow || 'pink']}
                           variants={itemVariants} onClick={() => props.to && navigate(props.to)} {...props} />
}
