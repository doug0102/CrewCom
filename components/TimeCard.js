import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment';

import TimeCardButton from './TimeCardButton';
import UserService from '../services/UserService'
import GLOBALS from '../globals';

class TimeCard extends Component {

    constructor(props) {
        super(props);

        this.user = UserService.currentUser();

        var now = new Date();

        this.state = {
            displayDate: moment(now).format('l'),
            displayTime: moment(now).format('hh:mm'),
            timePeriod: moment(now).format('A'),

            isClockedIn: false,
            isOnBreak: false
        }
    }

    componentDidMount() {

        this.dateInterval = setInterval(() => {
            var now = new Date();

            this.setState({
                displayDate: moment(now).format('l'),
                displayTime: moment(now).format('hh:mm'),
                timePeriod: moment(now).format('A'),
            });
        }, 1000);
    }

    componentWillUnmount() {

        if (this.dateInterval) {
            clearInterval(this.dateInterval);
        }
    }

    clockInCallback = (childData) => {
        this.setState({
            isClockedIn: childData,
            isOnBreak: childData === false ? false : this.state.isOnBreak
        });
    }

    toggleBreak = () => {
        this.setState({
            isOnBreak: !this.state.isOnBreak
        });
    }

    breakButtonText() {
        if (this.state.isOnBreak) {
            return 'End Break';
        }
        return 'Start Break';
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.row}>

                    <View style={styles.card}>

                        <View style={{ flexDirection: 'column', alignItems: 'baseline', }}>
                            <Text style={{ fontSize: '20px', marginBottom: '-15px', }}>{this.state.displayDate}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'baseline', }}>
                                <Text style={{ fontSize: '60px', fontWeight: 'bold', }}>{this.state.displayTime}</Text>
                                <Text style={{ fontSize: '30px', fontWeight: 'bold', }}>{this.state.timePeriod}</Text>

                                <FontAwesomeIcon icon={faCalendarAlt} size="45"
                                    style={{ position: 'absolute', left: '78%', top: '-20%', opacity: '0.6', color: GLOBALS.COLORS.PRIMARY, }}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.buttonSpace}>
                                <TimeCardButton
                                    user={this.user}
                                    clockedIn={this.state.isClockedIn}
                                    parentCallback={this.clockInCallback}
                                />
                            </View>
                            <View style={styles.buttonSpace}>
                                <Button title={this.breakButtonText()} disabled={!this.state.isClockedIn} onPress={this.toggleBreak}></Button>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}
export default TimeCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'stretch'
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 12,
    },
    buttonSpace: {
        margin: '5px',
    }
});