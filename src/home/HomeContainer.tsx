import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, Image, LayoutAnimation, Animated } from 'react-native';
import { Camera, Permissions, BlurView } from 'expo';
import { createStackNavigator } from 'react-navigation'
import CameraView from './CameraView';
import CameraButton from './CameraButton';
import CarouselView from './CarouselView';
import GradeCircleView from '../shared/GradeCircleView';
import NotifierView from './NotifierView';
import { Grade, SnapCarouselItem, Receipt } from './models';
import ReceiptCard from '../history/ReceiptCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Transition } from 'react-navigation-fluid-transitions'
import Modal from "react-native-modal";
import { ImageAsset } from '../../assets/images';
import * as Animatable from 'react-native-animatable';
import ReceiptHistoryContainer from '../history/ReceiptHistory';
import ShopScanApi from '../api';

const WINDOW_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = WINDOW_WIDTH - 100


interface IHomeContainerProps {
  navigation?: any
}
interface IHomeContainerState {
  headerText: string
  headerOpacity: Animated.Value

  type: Camera.Constants.Type
  modalVisible: boolean
  historyVisible: boolean
  isLoading: boolean

  carouselData: SnapCarouselItem[]

  processedReceipt?: Receipt
}

export default class HomeContainer extends React.Component<IHomeContainerProps, IHomeContainerState> {
  private cameraRef: any
  constructor(props) {
    super(props)
    this.state = {
      headerText: 'Welcome Nate',
      headerOpacity: new Animated.Value(1),
      type: Camera.Constants.Type.back,
      modalVisible: false,
      historyVisible: false,
      isLoading: false,
      carouselData: []
    }
    this.showDetail = this.showDetail.bind(this)
  }

  public componentDidMount() {
    setTimeout(async () => {
      await new Promise(resolve => Animated.timing(this.state.headerOpacity, {
        toValue: 0,
        duration: 300
      }).start(resolve))
      await new Promise(resolve => this.setState({ headerText: 'Recent Updates' }, resolve))
      await new Promise(resolve => Animated.timing(this.state.headerOpacity, {
        toValue: 1,
        duration: 300
      }).start(resolve))
    }, 1500);

    this.setState({ carouselData: ShopScanApi.getRecentUpdates() })
  }

  private flipCamera = () => {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }

  private segueToHistory = () => {
    // this.props.navigation.navigate('History')
    this.setState({ historyVisible: true })
  }

  private takePicture = async () => {
    if (this.cameraRef) {
      let photo = await this.cameraRef.takePictureAsync();
    }

    this.setState({ modalVisible: true, isLoading: true })
    const receiptDetails = await ShopScanApi.postAndProcessReceipt('')
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ isLoading: false, processedReceipt: receiptDetails })
  }

  private showDetail = (receipt: Receipt) => {
    this.props.navigation.navigate('Details', { receipt })
  }

  public render() {
    return (
      <View style={styles.container} >
        <CameraView cameraRef={(ref) => { this.cameraRef = ref }} style={styles.camera} type={this.state.type}>
          <SafeAreaView style={styles.cameraContentContainer}>
            <View style={styles.carouselTitleContainer}>
              <Animated.Text style={[styles.carouselTitle, { opacity: this.state.headerOpacity }]}>{this.state.headerText}</Animated.Text>
              <CarouselView items={this.state.carouselData} />
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
              [<Image key={'loadingimage'} style={{ width: 120, height: 120 }} source={ImageAsset.LOADING_GIF} defaultSource={ImageAsset.LOADING_GIF} resizeMode={'contain'} />,
              <Text key={'loadingtext'} style={{ textAlign: 'center', color: 'white', fontFamily: 'circular-book', fontSize: 18, margin: 20 }}>We're processing your data{'\n\n'}<Text style={{ fontFamily: 'circular-bold' }}>Did you know...</Text> {ShopScanApi.getRandomTip()}</Text>]
              :
              <Animatable.View animation={'bounceInDown'} duration={800} easing={'ease-in-out'}>
                < ReceiptCard
                  style={{ width: ITEM_WIDTH, aspectRatio: 1 / 1.4 }}
                  receipt={this.state.processedReceipt}
                  onPress={() => {
                    this.showDetail(this.state.processedReceipt!)
                    this.setState({ modalVisible: false })
                  }} />
              </Animatable.View>
            }
          </Modal>
        </CameraView>
        <Modal style={{ margin: 0 }} backdropOpacity={0} animationOut={'fadeOut'} animationIn={'fadeIn'} hideModalContentWhileAnimating={true} isVisible={this.state.historyVisible} >
          <ReceiptHistoryContainer
            showDetail={(item) => {
              this.setState({ historyVisible: false })
              this.showDetail(item)
            }}
            onPressDismiss={() => {
              this.setState({ historyVisible: false })
            }}
          />
        </Modal>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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