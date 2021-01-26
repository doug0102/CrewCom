import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';

import GLOBALS from '../globals';
import Storage from '../data/Storage';

class TimeCardButton extends Component {

    constructor(props) {
        super(props);

        this.user = props.user;

        this.state = {
            clockedIn: props.clockedIn
        }
    }

    componentDidMount() {

    }

    getButtonText = function () {
        if (this.state.clockedIn) {
            return 'Clock Out';
        }
        return 'Clock In';
    }

    handleClick = () => {

        this.props.parentCallback(!this.state.clockedIn);

        var clockObj = {
            user: this.user,
            date: new Date(),
            in: !this.state.clockedIn
        };
        console.log(clockObj)
        Storage.saveData(GLOBALS.STORAGE.TIME + GLOBALS.STORAGE.SEPARATOR + this.user._id, JSON.stringify(clockObj));

        this.setState({
            clockedIn: !this.state.clockedIn
        });
    }

    render() {
        return (
            <Button
                title={this.getButtonText()}
                accessibilityLabel={this.getButtonText()}
                onPress={this.handleClick}
                style={styles.button}
            />
        )
    }
}
export default TimeCardButton;

const styles = StyleSheet.create({
    button: {
        flex: 1,
    }
});