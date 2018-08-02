import * as React from 'react'
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IGradeCircleViewProps {
  text?: string
  textStyle?: TextStyle
  viewStyle?: ViewStyle
}

export default class GradeCircleView extends React.Component<IGradeCircleViewProps, {}> {
  public render() {
    return (
      <View style={[styles.container, this.props.viewStyle]}>
        <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: 70,
    aspectRatio: 1,
    borderRadius: 70 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    marginBottom: 6,
    margin: 8
  },
  text: {
    fontFamily: 'circular-bold',
    fontSize: 40,
    textAlign: 'center',
    color: 'white'
  }
})