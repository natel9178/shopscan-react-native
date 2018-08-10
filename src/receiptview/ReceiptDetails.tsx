import * as React from 'react'
import { View, ScrollView, StyleSheet, Text, Image, FlatList } from 'react-native'
import { GradeColorManager, Grade } from '../home/models';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Color from '../home/models/Colors';
import { ImageAsset } from '../../assets/images';
import { Parallax } from 'react-native-parallax'
import GradeCircleView from '../shared/GradeCircleView';

class Company {
  public name: string
  public grade: Grade
}

class ReceiptItem {
  public id: number
  public company: Company
  public item: string
}

const fakeData: ReceiptItem[] = [
  {
    id: 1,
    company: {
      name: 'ABInBev',
      grade: Grade.F
    },
    item: 'Corona Beer'
  },
  {
    id: 2,
    company: {
      name: 'ABInBev',
      grade: Grade.F
    },
    item: 'Corona Beer'
  },
  {
    id: 3,
    company: {
      name: 'ABInBev',
      grade: Grade.F
    },
    item: 'Corona Beer'
  },
  {
    id: 4,
    company: {
      name: 'ABInBev',
      grade: Grade.F
    },
    item: 'Corona Beer'
  }
]
export default class ReceiptDetails extends React.Component<{}, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ height: '100%', width: '100%' }}>
          <View style={styles.textContainer} >
            <Text style={styles.title}>June 7th, 2018</Text>
            <Text style={styles.subtitle}>This purchase brought you 25% closer!</Text>
          </View >
          <View style={{ marginHorizontal: 22, backgroundColor: 'lightgrey', borderRadius: 8, alignItems: 'center' }}>
            <View style={{ width: '100%', backgroundColor: 'white', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
                <MaterialCommunityIcons name='receipt' size={35} color={Color.BLUE} />
                <Entypo name='dots-three-vertical' size={20} color={Color.BLUE} />
              </View>
              <View style={{ margin: 4, width: '100%' }}>
                <Text style={styles.receiptTitle}>$92,000 contributed</Text>
                <Text style={styles.receiptSubtitle}>7 Companies patronized</Text>
              </View>
              <Image style={{ marginVertical: 8, borderRadius: 8, width: '100%', height: 150, position: 'relative', overflow: 'hidden' }} source={ImageAsset.SAMPLE_RECEIPT} resizeMode={'cover'} />
            </View>
            <FlatList
              style={{ width: '100%', position: 'relative', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
              data={fakeData}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cellContainer}>
                    <View style={styles.cellTextContainer}>
                      <Text style={styles.cellTitle}>{item.item}</Text>
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
    backgroundColor: GradeColorManager.getBackgroundColorForGrade(Grade.F)
  },
  textContainer: {
    marginHorizontal: 22,
    marginVertical: 40
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
    marginRight: 8
  },
  cellTextContainer: { justifyContent: 'center', marginLeft: 4 },
  cellTitle: { fontFamily: 'circular-bold', fontSize: 19 },
  cellSubtitle: { fontFamily: 'circular-book', color: 'darkgrey' }
})
