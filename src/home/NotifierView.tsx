import * as React from 'react'
import { BlurView } from 'expo';
import { View, Text, ViewStyle, StyleSheet } from 'react-native';
import GradeCircleView from '../shared/GradeCircleView';

interface INotifierViewProps {
  style?: ViewStyle
}

export default class NotifierView extends React.Component<INotifierViewProps, {}> {
  public render() {
    return (
      <BlurView style={[styles.container, this.props.style]} tint={'dark'} intensity={80}>
        <View style={{ flexDirection: 'row' }}>
          <GradeCircleView text={'F'} />
        </View>
        <Text style={{ fontFamily: 'circular-bold', fontSize: 24, textAlign: 'center', color: 'white', marginTop: 6 }}>Avg. Ethics Score</Text>
      </BlurView>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  }
})