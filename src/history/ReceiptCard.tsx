import * as React from 'react'
import { View, ViewStyle, Text, StyleSheet, Image } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import GradeCircleView from '../shared/GradeCircleView';
import { Entypo } from '@expo/vector-icons';
import { Receipt } from '../home/models';
import { ImageAsset } from '../../assets/images';

interface IReceiptCardProps {
  style?: ViewStyle
  receipt: Receipt
  parallaxProps?: any
}

export default class ReceiptCard extends React.Component<IReceiptCardProps, {}> {
  public imageComponent() {
    return this.props.parallaxProps ?
      <ParallaxImage
        source={ImageAsset.SAMPLE_RECEIPT}
        containerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
        parallaxFactor={0.4}
        {...this.props.parallaxProps}
      />
      :
      <Image style={{ flex: 1 }} source={ImageAsset.SAMPLE_RECEIPT} />
  }
  public render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.clippingContainer}>
          {this.imageComponent()}
          <View style={styles.overlayContainer}>
            <View style={styles.topHeaderContainer}>
              <GradeCircleView viewStyle={styles.gradeStyle} textStyle={styles.gradeText} grade={this.props.receipt.grade} />
              <Entypo name='dots-three-vertical' size={20} color='white' />
            </View>
            <View style={styles.bottomContainer}>
              <Text style={styles.subtitle}>7 Companies</Text>
              <Text style={styles.title}>{this.props.receipt.title}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: -2,
      height: 5
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderRadius: 10,
  },
  clippingContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10
  },
  overlayContainer: { position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'space-between' },
  topHeaderContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16 },
  gradeStyle: { backgroundColor: 'lightgreen', width: 50, marginTop: 7 },
  gradeText: { fontSize: 22 },
  bottomContainer: { margin: 16 },
  subtitle: { fontFamily: 'circular-book', color: 'lightgrey', fontSize: 20 },
  title: {
    fontFamily: 'circular-book',
    fontSize: 40,
    color: 'white',
    marginBottom: 15
  },
})
