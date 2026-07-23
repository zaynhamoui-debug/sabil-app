import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface Props {
  width?: number
  height?: number
  style?: object
}

export default function Logo({ width = 160, height = 60, style }: Props) {
  return (
    <Image
      source={{ uri: 'https://www.sabil.us/wp-content/uploads/2023/07/sabil-logo-color-transparent-background_3.png' }}
      style={[{ width, height }, style]}
      resizeMode="contain"
    />
  )
}
