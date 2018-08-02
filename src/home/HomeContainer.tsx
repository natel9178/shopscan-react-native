import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, Image, LayoutAnimation } from 'react-native';
import { Camera, Permissions, BlurView } from 'expo';
import { createStackNavigator } from 'react-navigation'
import CameraView from './CameraView';
import CameraButton from './CameraButton';
import CarouselView from './CarouselView';
import GradeCircleView from '../shared/GradeCircleView';
import NotifierView from './NotifierView';
import { Grade } from './models';
import ReceiptCard from '../history/ReceiptCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Transition } from 'react-navigation-fluid-transitions'
import Modal from "react-native-modal";
import { ImageAsset } from '../../assets/images';
import * as Animatable from 'react-native-animatable';

const WINDOW_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = WINDOW_WIDTH - 100


interface IHomeContainerProps {
  navigation?: any
}
interface IHomeContainerState {
  type: Camera.Constants.Type
  modalVisible: boolean
  isLoading: boolean
}

export default class HomeContainer extends React.Component<IHomeContainerProps, IHomeContainerState> {
  constructor(props) {
    super(props)
    this.state = { type: Camera.Constants.Type.front, modalVisible: false, isLoading: false }
  }

  private flipCamera = () => {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }

  private segueToHistory = () => {
    this.props.navigation.navigate('History')
  }

  private takePicture = () => {
    this.setState({ modalVisible: true, isLoading: true })
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      this.setState({ isLoading: false })
    }, 5000);
  }

  public render() {
    return (
      <View style={styles.container} >
        <CameraView style={styles.camera} type={this.state.type}>
          <SafeAreaView style={styles.cameraContentContainer}>
            <View style={styles.carouselTitleContainer}>
              <Text style={styles.carouselTitle}>Recent Updates</Text>
              <CarouselView items={[{ title: 'AB InBev', description: 'Conflict minerals rating', grade: Grade.F }, { title: 'AB InBev', description: 'Conflict minerals rating', grade: Grade.F }, { title: 'AB InBev', description: 'Conflict minerals rating', grade: Grade.F }]} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '85%' }}>
              <TouchableOpacity onPress={this.flipCamera}>
                <MaterialCommunityIcons name={this.state.type === Camera.Constants.Type.front ? 'camera-rear-variant' : 'camera-front-variant'} size={30} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.takePicture}>
                <CameraButton />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.segueToHistory}>
                <MaterialCommunityIcons name='cards' size={35} color={'white'} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <Modal style={{ justifyContent: 'center', alignItems: 'center' }} animationOut={'fadeOut'} animationIn={'fadeIn'} onBackdropPress={() => { if (!this.state.isLoading) this.setState({ modalVisible: false }) }} isVisible={this.state.modalVisible}>
            {this.state.isLoading ?
              [<Image key={'loadingimage'} style={{ width: 120, height: 120 }} source={ImageAsset.LOADING_GIF} resizeMode={'contain'} />,
              <Text key={'loadingtext'} style={{ textAlign: 'center', color: 'white', fontFamily: 'circular-book', fontSize: 18, margin: 20 }}>We're processing your data{'\n\n'}<Text style={{ fontFamily: 'circular-bold' }}>Did you know...</Text> AB InBev recently donated one million to cigarette companies?</Text>]
              :
              <Animatable.View animation={'bounceInDown'} duration={800} easing={'ease-in-out'}>
                < ReceiptCard style={{ width: ITEM_WIDTH, aspectRatio: 1 / 1.4 }} receipt={{ id: 'TransitonExample', title: '$92,000', grade: Grade.A }} />
              </Animatable.View>
            }
          </Modal>
          {/* <View style={{
            position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'
          }}>
            < ReceiptCard style={{ width: ITEM_WIDTH, aspectRatio: 1 / 1.4 }} receipt={{ id: 'TransitonExample', title: '$92,000', grade: Grade.A }} />
          </View> */}
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
  carouselTitleContainer: {
    marginTop: 50,
    height: 150,
  },
  carouselTitle: { fontFamily: 'circular-bold', color: 'white', fontSize: 30, marginLeft: 30, marginBottom: 10 }
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