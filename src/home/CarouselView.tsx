import React from 'react'
import { SnapCarouselItem } from './models';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, StyleSheet } from 'react-native';
import { View, Text } from 'react-native'
import GradeCircleView from '../shared/GradeCircleView';


interface ICarouselProps {
  items: SnapCarouselItem[]
}

const WINDOW_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = WINDOW_WIDTH - 60

export default class CarouselView extends React.Component<ICarouselProps, {}> {
  private _carousel: any

  public _renderItem({ item, index }) {
    return (
      <View style={styles.cellContainer}>
        <GradeCircleView viewStyle={styles.gradeStyle} textStyle={styles.gradeText} grade={item.grade} />
        <View style={styles.cellTextContainer}>
          <Text style={styles.cellTitle}>{item.title}</Text>
          <Text style={styles.cellSubtitle}>{item.description}</Text>
        </View>
      </View>
    );
  }

  public render() {
    return (
      <Carousel
        style={styles.carouselStyle}
        ref={(c) => { this._carousel = c; }}
        data={this.props.items}
        layout={'default'}
        renderItem={this._renderItem}
        sliderWidth={WINDOW_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    );
  }
}

const styles = StyleSheet.create({
  carouselStyle: { width: WINDOW_WIDTH, height: 100 },
  cellContainer: {
    backgroundColor: 'white', width: ITEM_WIDTH, height: 60, shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5
  },
  gradeText: {
    fontSize: 24
  },
  gradeStyle: {
    width: 42,
    borderRadius: 42,
    marginRight: 8
  },
  cellTextContainer: { justifyContent: 'center', marginLeft: 4 },
  cellTitle: { fontFamily: 'circular-bold', fontSize: 19 },
  cellSubtitle: { fontFamily: 'circular-book', color: 'darkgrey' }
})