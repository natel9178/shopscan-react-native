import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera, Permissions, BlurView } from 'expo';
import { createStackNavigator } from 'react-navigation'
import CameraView from './CameraView';
import CameraButton from './CameraButton';
import CarouselView from './CarouselView';
import GradeCircleView from '../shared/GradeCircleView';
import NotifierView from './NotifierView';

interface IHomeContainerState {
  type: Camera.Constants.Type
}

export default class HomeContainer extends React.Component<{}, IHomeContainerState> {
  constructor(props) {
    super(props)
    this.state = { type: Camera.Constants.Type.front }
  }
  public render() {
    return (
      <View style={styles.container} >
        <CameraView style={styles.camera} type={this.state.type}>
          <SafeAreaView style={styles.cameraContentContainer}>
            <View style={styles.carouselTitleContainer}>
              <Text style={styles.carouselTitle}>Industry Updates</Text>
              <CarouselView items={[{ title: 'AB InBev', description: 'Conflict minerals rating', grade: 'f' }, { title: 'AB InBev', description: 'Conflict minerals rating', grade: 'f' }, { title: 'AB InBev', description: 'Conflict minerals rating', grade: 'f' }]} />
            </View>

            <NotifierView style={styles.overlay} />
            <CameraButton />
          </SafeAreaView>
        </CameraView>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraContentContainer: { flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'space-between', padding: 10 },
  overlay: {
    height: 300,
    width: 200,
    borderRadius: 15,
    alignItems: 'center',
    padding: 16,
    paddingTop: 30
  },
  carouselTitleContainer: {
    marginTop: 30,
    height: 150
  },
  carouselTitle: { fontFamily: 'circular-bold', fontSize: 30, marginLeft: 15, marginBottom: 10 }
})

{/* <TouchableOpacity style={{ flex: 0.1, alignItems: 'center' }}
            onPress={() => {
              this.setState({
                type: this.state.type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              });
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> {' '}Flip{' '} </Text>
          </TouchableOpacity> */}