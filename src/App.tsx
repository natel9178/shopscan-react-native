import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, Font } from 'expo';
import { createStackNavigator } from 'react-navigation'
import CameraView from './home/CameraView';
import HomeContainer from './home/HomeContainer';
import ReceiptHistoryContainer from './history/ReceiptHistory';
import { FluidNavigator } from 'react-navigation-fluid-transitions'
import ReceiptDetails from './receiptview/ReceiptDetails';

function forVertical(props) {
	const { layout, position, scene } = props;

	const index = scene.index;
	const height = layout.initHeight;

	const translateX = 0;
	const translateY = position.interpolate({
		inputRange: [index - 1, index, index + 1],
		outputRange: [height, 0, 0]
	});

	return {
		transform: [{ translateX }, { translateY }]
	};
}

const MainStack = FluidNavigator({
	Details: { screen: ReceiptDetails },
	Home: { screen: HomeContainer },
	History: { screen: ReceiptHistoryContainer },
}, {
		initialRouteName: 'Home',
		transitionConfig: () => ({
			containerStyle: {
			}
		}),
		navigationOptions: { gesturesEnabled: false },
	});


interface IAppState {
	fontLoaded: boolean
}
export default class App extends React.Component<{}, IAppState> {
	constructor(props) {
		super(props)
		this.state = { fontLoaded: false }
	}
	public async componentWillMount() {
		await Font.loadAsync({
			'circular-medium': require('../assets/circular/circular-medium.otf'),
			'circular-bold': require('../assets/circular/circular-bold.otf'),
			'circular-book': require('../assets/circular/circular-book.otf'),
		});
		this.setState({ fontLoaded: true })
	}
	public render() {
		return (
			this.state.fontLoaded ? <MainStack /> : <View />
		)
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
