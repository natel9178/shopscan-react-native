import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { ImageAsset } from '../../assets/images';

const WINDOW_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = WINDOW_WIDTH - 100
const ITEM_HEIGHT = ITEM_WIDTH * 1.4

export default class ReceiptHistoryContainer extends React.Component<{}, {}> {
  constructor(props) {
    super(props)
  }
  private _carousel: any

  public _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={{
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
          width: -2,
          height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 0.3,
        borderRadius: 10,
      }}>
        <View style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 10
        }}>
          <View style={{ flex: 1 }}>
            <ParallaxImage
              source={ImageAsset.SAMPLE_RECEIPT}
              containerStyle={{ flex: 1 }}
              style={{ flex: 1 }}
              parallaxFactor={0.4}
              {...parallaxProps}
            />
            <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.3 }}>
              <View style={{}}>
                
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  public render() {
    return (
      <View style={styles.container} >
        <View style={{ margin: 55 }} >
          <Text style={{ fontFamily: 'circular-book', fontSize: 40, color: 'white', marginBottom: 15 }}>Hello, Nate</Text>
          <Text style={{ fontFamily: 'circular-book', color: 'lightgrey', fontSize: 15 }}>Thanks for being ethical</Text>
          <Text style={{ fontFamily: 'circular-book', color: 'lightgrey', fontSize: 15 }}>You're about 15% from your goal</Text>
        </View >
        <View style={{ height: ITEM_HEIGHT + 50 }}>
          <Text style={{ fontFamily: 'circular-book', color: 'white', fontSize: 13, marginBottom: 15, marginLeft: 55 }}>{'5/7 receipts with A- or higher'.toUpperCase()}</Text>
          <View style={{ height: ITEM_HEIGHT + 30 }}>
            <Carousel
              style={{ width: WINDOW_WIDTH + 20, height: ITEM_HEIGHT }}
              ref={(c) => { this._carousel = c; }}
              data={[{ title: 'June 24th', grade: 'A' }, { title: 'June 24th', grade: 'A' }, { title: 'June 24th', grade: 'A' }]}
              layout={'default'}
              renderItem={this._renderItem}
              sliderWidth={WINDOW_WIDTH}
              itemWidth={ITEM_WIDTH}
              hasParallaxImages={true}
            />
          </View>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F37C6D',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
})
