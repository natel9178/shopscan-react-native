import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, LayoutAnimation, Animated, Easing } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { ImageAsset } from '../../assets/images';
import { Grade, Receipt, GradeColorManager } from '../home/models';
import GradeCircleView from '../shared/GradeCircleView';
import { Entypo } from '@expo/vector-icons';
import ReceiptCard from './ReceiptCard';
import { Transition } from 'react-navigation-fluid-transitions'
import { BlurView } from 'expo';
import ShopScanApi from '../api';

const WINDOW_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = WINDOW_WIDTH - 100
const ITEM_HEIGHT = ITEM_WIDTH * 1.4
interface IReceiptHistoryContainerProps {
  onPressDismiss: () => void
  showDetail: (receipt: Receipt) => void
  navigation?: any
}
interface IReceiptHistoryContainerState {
  backgroundColorAnim: Animated.Value
  backgroundColor: string
  nextBackgroundColor: string
  historyData: Receipt[]
}

export default class ReceiptHistoryContainer extends React.Component<IReceiptHistoryContainerProps, IReceiptHistoryContainerState> {
  constructor(props) {
    super(props)
    this.state = { backgroundColorAnim: new Animated.Value(0), backgroundColor: 'lightgreen', nextBackgroundColor: 'lightgreen', historyData: [] }
  }
  private _carousel: any



  public _renderItem({ item, index }, parallaxProps) {
    const onRowPress = (item: Receipt) => {
      this.props.showDetail(item)
    }

    return (
      <ReceiptCard style={{ height: ITEM_HEIGHT, width: ITEM_WIDTH }} receipt={item} parallaxProps={parallaxProps} onPress={() => { onRowPress(item) }} />
    );
  }

  public componentDidMount() {
    this.setState({ historyData: ShopScanApi.getReceiptHistory() }, () => {
      this.animateBackgroundToColor(GradeColorManager.getBackgroundColorForGrade(this.state.historyData[0].grade))
    })
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
      <BlurView tint='dark' intensity={97} style={{ flex: 1 }}>
        <Animated.View style={[styles.container, {
          backgroundColor: this.state.backgroundColorAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.backgroundColor, this.state.nextBackgroundColor]
          })
        }]} >
          <Entypo.Button iconStyle={{ marginHorizontal: 12 }} name='chevron-thin-left' size={30} backgroundColor={'transparent'} color={'white'} onPress={this.props.onPressDismiss} />
          <View style={styles.textContainer} >
            <Text style={styles.helloTitle}>Hello, Nate</Text>
            <Text style={styles.subtitle}>You're doing great!</Text>
            <Text style={styles.subtitle}>Try reducing f-rated companies next.</Text>
          </View >
          <View style={styles.carouselContainer}>
            <Text style={styles.carouselTopText}>{`1/${this.state.historyData.length} receipts with A- or higher`.toUpperCase()}</Text>
            <View style={styles.carouselWrapper}>
              <Carousel
                style={styles.carousel}
                ref={(c) => { this._carousel = c; }}
                data={this.state.historyData}
                layout={'default'}
                onBeforeSnapToItem={(i: number) => {
                  this.animateBackgroundToColor(GradeColorManager.getBackgroundColorForGrade(this.state.historyData[i].grade))
                }}
                renderItem={this._renderItem.bind(this)}
                sliderWidth={WINDOW_WIDTH}
                itemWidth={ITEM_WIDTH}
                hasParallaxImages={true}
              />
            </View>
          </View>
        </Animated.View >
      </BlurView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '100%',
    height: ITEM_HEIGHT
  }
})
