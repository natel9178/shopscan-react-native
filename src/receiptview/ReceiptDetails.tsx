import * as React from 'react'
import { View, ScrollView, StyleSheet, Text, Image, FlatList, Dimensions } from 'react-native'
import { GradeColorManager, Grade, Receipt } from '../home/models';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Color from '../home/models/Colors';
import { ImageAsset } from '../../assets/images';
import { Parallax } from 'react-native-parallax'
import GradeCircleView from '../shared/GradeCircleView';
import { Transition } from 'react-navigation-fluid-transitions'
import { format } from 'date-fns'
import Lightbox from 'react-native-lightbox';


const { height, width } = Dimensions.get('window');

export default class ReceiptDetails extends React.Component<{}, {}> {
  public render() {
    const receipt: Receipt = this.props.navigation.getParam('receipt')
    return (
      <View style={styles.container}>
        <ScrollView style={{ height: '100%', width: '100%' }} contentInset={{ bottom: 50, top: 50 }}>
          <Entypo.Button iconStyle={{ marginHorizontal: 6 }} name='chevron-thin-left' size={30} backgroundColor={'transparent'} color={'white'} onPress={() => { this.props.navigation.goBack() }} />
          <View style={styles.textContainer} >
            <GradeCircleView viewStyle={styles.gradeStyle} textStyle={styles.gradeText} grade={receipt.grade} />
            <Text style={styles.title}>{format(receipt.dateCaptured!, 'MMM Do, YYYY')}</Text>
            <Text style={styles.subtitle}>Oh no... more than 75% unethical companies on this grocery run.</Text>
          </View >
          <View style={{ marginHorizontal: 22, backgroundColor: 'lightgrey', borderRadius: 8, alignItems: 'center' }}>
            <View style={{ width: '100%', backgroundColor: 'white', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
                <MaterialCommunityIcons name='receipt' size={35} color={Color.BLUE} />
                <Entypo name='dots-three-vertical' size={20} color={Color.BLUE} />
              </View>
              <View style={{ margin: 4, width: '100%' }}>
                <Text style={styles.receiptTitle}>{receipt.supermarket!.name!} Run</Text>
                <Text style={styles.receiptSubtitle}>{receipt.getCompanies().size} Companies patronized</Text>
              </View>
              <Lightbox activeProps={{ resizeMode: 'contain', flex: 1, height }}>
                <Image style={{ marginVertical: 8, borderRadius: 8, width: '100%', height: 150, position: 'relative', overflow: 'hidden' }} source={receipt.picture} resizeMode={'cover'} />
              </Lightbox>
            </View>
            <FlatList
              style={{ width: '100%', position: 'relative', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
              data={receipt.receiptItems}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cellContainer}>
                    <View style={styles.cellTextContainer}>
                      <Text style={styles.cellTitle}>{item.item}<Text style={{ fontFamily: 'circular-book', color: 'rgba(0,0,0,0.5)', fontSize: 15 }}>{item.company.prediction ? ' (Prediction)' : ''}</Text></Text>
                      <Text style={styles.cellSubtitle}>{item.company.name}</Text>
                    </View>
                    <GradeCircleView viewStyle={styles.gradeStyle} textStyle={styles.gradeText} grade={item.company.grade} />
                  </View>
                )
              }}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.BLUE
  },
  textContainer: {
    marginHorizontal: 22,
    marginTop: 20,
    marginBottom: 40
  },
  title: {
    fontFamily: 'circular-bold',
    fontSize: 28,
    color: 'white',
    marginBottom: 4
  },
  subtitle: {
    fontFamily: 'circular-book',
    color: 'rgb(240, 240, 240)',
    fontSize: 15
  },
  receiptTitle: {
    fontFamily: 'circular-bold',
    fontSize: 28,
    color: 'black',
  },
  receiptSubtitle: {
    fontFamily: 'circular-book',
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 15,
    marginVertical: 3
  },
  cellContainer: {
    backgroundColor: '#fcfcfc', height: 60, shadowColor: '#000000',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  gradeText: {
    fontSize: 24
  },
  gradeStyle: {
    width: 37,
    borderRadius: 37,
    marginRight: 8,
    marginBottom: 8
  },
  cellTextContainer: { justifyContent: 'center', marginLeft: 4 },
  cellTitle: { fontFamily: 'circular-bold', fontSize: 19 },
  cellSubtitle: { fontFamily: 'circular-book', color: 'darkgrey' }
})
