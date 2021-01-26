import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import GLOBALS from '../globals';

class ComplianceScreen extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Compliance Screen... coming soon!</Text>
            </View>
        )
    }
}
export default ComplianceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GLOBALS.COLORS.BACKGROUND
    }
});