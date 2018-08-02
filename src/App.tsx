import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, Font } from 'expo';
import { createStackNavigator } from 'react-navigation'
import CameraView from './home/CameraView';
import HomeContainer from './home/HomeContainer';
import ReceiptHistoryContainer from './history/ReceiptHistory';

const MainStack = createStackNavigator(
	{
		Home: {
			screen: HomeContainer, navigationOptions: ({ navigation }) => ({
				header: null
			}),
		},
		History: {
			screen: ReceiptHistoryContainer, navigationOptions: ({ navigation }) => ({
				header: null
			}),
		},
	},
	{
		initialRouteName: 'Home',
		headerMode: 'screen',
		mode: 'modal',
	}
);


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
