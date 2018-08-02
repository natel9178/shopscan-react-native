import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, LayoutAnimation, Animated, Easing } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { ImageAsset } from '../../assets/images';
import { Grade, Receipt, GradeColorManager } from '../home/models';
import GradeCircleView from '../shared/GradeCircleView';
import { Entypo } from '@expo/vector-icons';
import ReceiptCard from './ReceiptCard';
import { Transition } from 'react-navigation-fluid-transitions'

const WINDOW_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = WINDOW_WIDTH - 100
const ITEM_HEIGHT = ITEM_WIDTH * 1.4
const sampleData = [{ id: 'TransitonExample', title: 'June 24th', grade: Grade.A }, { id: 'boo', title: 'June 24th', grade: Grade.F }, { id: 'm', title: 'June 24th', grade: Grade.C }]

interface IReceiptHistoryContainerState {
  focusedReceipt: Receipt
  backgroundColorAnim: Animated.Value
  backgroundColor: string
  nextBackgroundColor: string
}

export default class ReceiptHistoryContainer extends React.Component<{}, IReceiptHistoryContainerState> {
  constructor(props) {
    super(props)
    this.state = { focusedReceipt: { id: 'TransitonExample', title: 'June 24th', grade: Grade.A }, backgroundColorAnim: new Animated.Value(0), backgroundColor: 'lightgreen', nextBackgroundColor: 'lightgreen' }
  }
  private _carousel: any

  public _renderItem({ item, index }, parallaxProps) {
    return (
      <ReceiptCard style={{ height: ITEM_HEIGHT, width: ITEM_WIDTH }} receipt={item} parallaxProps={parallaxProps} />
    );
  }

  private animateBackgroundToColor(color: string) {
    this.setState({ backgroundColor: this.state.nextBackgroundColor, nextBackgroundColor: color }, () => {
      this.state.backgroundColorAnim.setValue(0)
      Animated.timing(this.state.backgroundColorAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.quad
      }).start()
    })
  }

  public render() {
    return (
      <Animated.View style={[styles.container, {
        backgroundColor: this.state.backgroundColorAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [this.state.backgroundColor, this.state.nextBackgroundColor]
        })
      }]} >
        <View style={styles.textContainer} >
          <Text style={styles.helloTitle}>Hello, Nate</Text>
          <Text style={styles.subtitle}>Thanks for being ethical</Text>
          <Text style={styles.subtitle}>You're about 15% from your goal</Text>
        </View >
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTopText}>{'5/7 receipts with A- or higher'.toUpperCase()}</Text>
          <View style={styles.carouselWrapper}>
            <Carousel
              style={styles.carousel}
              ref={(c) => { this._carousel = c; }}
              data={sampleData}
              layout={'default'}
              onBeforeSnapToItem={(i: number) => {
                this.animateBackgroundToColor(GradeColorManager.getBackgroundColorForGrade(sampleData[i].grade))
                // this.setState({ focusedReceipt: sampleData[i] })
              }}
              renderItem={this._renderItem}
              sliderWidth={WINDOW_WIDTH}
              itemWidth={ITEM_WIDTH}
              hasParallaxImages={true}
            />
          </View>
        </View>
      </Animated.View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(243,124,109)',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  textContainer: { margin: 55 },
  helloTitle: {
    fontFamily: 'circular-book',
    fontSize: 40,
    color: 'white',
    marginBottom: 15
  },
  subtitle: {
    fontFamily: 'circular-book',
    color: 'rgb(240, 240, 240)',
    fontSize: 15
  },
  carouselContainer: {
    height: ITEM_HEIGHT + 50
  },
  carouselTopText: {
    fontFamily: 'circular-book',
    color: 'white',
    fontSize: 13,
    marginBottom: 15,
    marginLeft: 55
  },
  carouselWrapper: {
    height: ITEM_HEIGHT + 30
  },
  carousel: {
    width: WINDOW_WIDTH + 20,
    height: ITEM_HEIGHT
  }
})
