import React from 'react'
import { Constants, Svg } from 'expo';
import { View, StyleSheet } from 'react-native'


export default class CameraButton extends React.Component<{}, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <Svg height={120} width={100}>
          <Svg.Circle
            cx={50}
            cy={10}
            r={5}
            fill="white"
          />
          <Svg.Circle
            cx={10}
            cy={27}
            r={5}
            fill="white"
          />
          <Svg.Circle
            cx={100 - 10}
            cy={27}
            r={5}
            fill="white"
          />
          <Svg.Circle
            cx={50}
            cy={70}
            r={40}
            strokeWidth={6}
            stroke="white"
            fill="transparent"
          />
        </Svg>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  }
})