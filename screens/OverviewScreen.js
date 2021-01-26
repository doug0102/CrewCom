import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import GLOBALS from '../globals';

class OverviewScreen extends Component {
	
	constructor(props) {
		super(props);
        this.navigation = props.navigation;
        this.params = props.route.params;
	}
	
	render() {
		return (
            <View style={styles.container}>
                <Text>Overview Screen... coming soon!</Text>
			</View>
		)
	}
}
export default OverviewScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GLOBALS.COLORS.BACKGROUND
	}
});