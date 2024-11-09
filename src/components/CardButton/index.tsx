import { IconType } from 'react-icons'

import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { css } from '@emotion/react'

import { colors } from '@/styles/colors'

export type CardButtonProps = {
  variant: 'orange' | 'white'
  orientation: 'vertical' | 'horizontal'
  label: string
  description: string
  Icon: IconType
  onClick?: () => void
}

export const CardButton = ({
  variant,
  orientation,
  label,
  description,
  Icon,
  onClick,
}: CardButtonProps) => {
  const styles =
    orientation === 'vertical'
      ? verticalStyles(variant)
      : horizontalStyles(variant)

  return (
    <Button css={styles} onClick={onClick}>
      {orientation === 'vertical' ? (
        <VerticalCardButton
          label={label}
          description={description}
          Icon={Icon}
        />
      ) : (
        <HorizontalCardButton
          label={label}
          description={description}
          Icon={Icon}
        />
      )}
    </Button>
  )
}

const VerticalCardButton = ({
  label,
  description,
  Icon,
}: Omit<CardButtonProps, 'variant' | 'orientation'>) => (
  <VStack
    spacing={2}
    align="flex-start"
    justify="flex-end"
    h="full"
    paddingBottom="10px"
  >
    <Box
      as={Icon}
      color="orange.400"
      backgroundColor="orange.50"
      borderRadius="8px"
      padding="4px"
      fontSize="30px"
      position="absolute"
      top="20px"
      left="10px"
    />
    <Text fontSize="16px" fontWeight="bold" color="text">
      {label}
    </Text>
    <Text
      fontSize="10px"
      fontWeight="medium"
      color="text_description"
      maxWidth="60px"
      overflowWrap="break-word"
      whiteSpace="normal"
      lineHeight="1.5"
    >
      {description}
    </Text>
  </VStack>
)

const HorizontalCardButton = ({
  label,
  description,
  Icon,
}: Omit<CardButtonProps, 'variant' | 'orientation'>) => (
  <HStack spacing={3} justify="center" align="center" h="full">
    <Box
      as={Icon}
      color="orange.400"
      backgroundColor="orange.50"
      borderRadius="8px"
      padding="4px"
      fontSize="30px"
    />
    <Text fontSize="16px" fontWeight="bold" color="text">
      {label}
    </Text>
    <Text fontSize="10px" fontWeight="medium" color="text_description">
      {description}
    </Text>
  </HStack>
)

const verticalStyles = (variant: 'orange' | 'white') =>
  css({
    borderRadius: '20px',
    height: '145px',
    width: '148px',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '10px',
    boxShadow: 'md',
    flexDirection: 'column',
    textAlign: 'left',
    position: 'relative',
    backgroundColor: variant === 'orange' ? colors.orange[200] : 'white',
    color: 'black',
    border: variant === 'white' ? `2px solid ${colors.black[100]}` : 'none',
    '&:hover': {
      backgroundColor:
        variant === 'orange' ? colors.orange[300] : colors.black[100],
    },
  })

const horizontalStyles = (variant: 'orange' | 'white') =>
  css({
    borderRadius: '8px',
    height: '60px',
    width: '300px',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    boxShadow: 'md',
    flexDirection: 'row',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: variant === 'orange' ? colors.orange[200] : 'white',
    color: 'black',
    border: variant === 'white' ? `2px solid ${colors.black[100]}` : 'none',
    '&:hover': {
      backgroundColor:
        variant === 'orange' ? colors.orange[300] : colors.black[100],
    },
  })
