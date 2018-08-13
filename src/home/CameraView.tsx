import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Camera, Permissions } from 'expo';

interface ICameraViewProps {
  style: ViewStyle
  children: any
  type: Camera.Constants.Type
  cameraRef: (ref: any) => void
}

interface ICameraViewState {
  hasCameraPermission: boolean
}

export default class CameraView extends React.Component<ICameraViewProps, ICameraViewState> {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: false,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Camera ref={this.props.cameraRef} style={this.props.style} type={this.props.type}>
          {this.props.children}
        </Camera>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
