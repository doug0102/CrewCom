import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import GLOBALS from '../globals';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.params = props.route.params;

        if (this.params === undefined) {
            this.params = {
                user: {
                    id: 1,
                    name: 'Developer'
                }
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Profile Screen for {this.params.user.name}</Text>
            </View>
        )
    }
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GLOBALS.COLORS.BACKGROUND
    }
});