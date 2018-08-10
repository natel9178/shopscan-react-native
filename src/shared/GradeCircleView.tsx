import * as React from 'react'
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { GradeColorManager, Grade } from '../home/models';

interface IGradeCircleViewProps {
  grade?: Grade
  textStyle?: TextStyle
  viewStyle?: ViewStyle
}

export default class GradeCircleView extends React.Component<IGradeCircleViewProps, {}> {
  public render() {
    return (
      <View style={[styles.container, this.props.viewStyle, { backgroundColor: GradeColorManager.getColorForGrade(this.props.grade) }]}>
        <Text style={[styles.text, this.props.textStyle]}>{this.props.grade.toUpperCase()}</Text>
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
  },
  text: {
    fontFamily: 'circular-bold',
    fontSize: 40,
    textAlign: 'center',
    color: 'white'
  }
})