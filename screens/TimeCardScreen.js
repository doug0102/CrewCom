//https://github.com/FormidableLabs/victory-native/issues/573

import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Button, SafeAreaView, FlatList, ScrollView  } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faStopwatch } from '@fortawesome/free-solid-svg-icons'

import PieChart from '../components/PieChart';
import Spacer from '../components/Spacer';
import TimeCard from '../components/TimeCard';
import UserService from '../services/UserService'
import GLOBALS from '../globals';

class TimeCardScreen extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.params = props.route.params;

        this.user = UserService.currentUser();

        this.state = {
            lastTimeCard: {
                date: 'Undefined',
                in: false
            }
        }
    }

    componentDidMount() {
        this.getLastTimeCard();
    }

    async getLastTimeCard() {
        var lastTimeCard = await UserService.getTimeCard(this.user._id);
        console.log(lastTimeCard)
        this.setState({
            lastTimeCard: lastTimeCard
        });
    }

    render() {
        //var screenWidth = Dimensions.get('window').width;
        //var screenHeight = Dimensions.get('window').height;

        var chartData = [{
            title: 'Today',
            data: [
                { x: "Completed", y: 30 },
                { x: "Breaks", y: 5 },
                { x: "Late", y: 2 },
            ],
            colors: [
                GLOBALS.COLORS.HEALTHY,     // completed
                GLOBALS.COLORS.WARNING,     // breaks
                GLOBALS.COLORS.CRITICAL,    // late
            ]
        }];

        var listData = [
            { id: 0, action: 'Clocked In', time: '07:32AM'},
            { id: 1, action: 'Began Break', time: '09:45AM'},
            { id: 2, action: 'Ended Break', time: '10:05AM'},
            { id: 3, action: 'Began Break', time: '01:00PM'},
            { id: 4, action: 'Ended Break', time: '01:34PM' },
            { id: 5, action: 'Break Ended', time: '01:34PM' },
            { id: 6, action: 'Break Ended', time: '01:34PM' },
            { id: 7, action: 'Break Ended', time: '01:34PM' },
            { id: 8, action: 'Break Ended', time: '01:34PM' },
            { id: 9, action: 'Break Ended', time: '01:34PM' },
        ];

        const Item = ({ action, time }) => (

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>

                <FontAwesomeIcon icon={faCircle} size="20"
                    style={{ color: GLOBALS.COLORS.HEALTHY, paddingRight: 20,}}
                />

                <Text style={{ fontSize: 17, paddingRight: 20, flex: 1, textAlign: 'center', fontStyle: 'italic' }}>{action}</Text>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontStyle: 'italic', fontSize: 13, color: '#a0a0a0' }}>{time.slice(0, time.length - 2)}</Text>
                    <Text style={{ fontStyle: 'italic', fontSize: 10, color: '#a0a0a0' }}>{time.slice(-2)}</Text>
                </View>
                

            </View>
        );

        const renderItem = ({ item }) => (
            <Item action={item.action} time={item.time} />
        );

        return (

            <View style={styles.container}>

                

                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>

                        <View style={styles.topRow}>
                            <Text>Pie Chart coming soon</Text>
                        </View>

                        <Spacer saOrientation={GLOBALS.ORIENTATIONS.HORIZONTAL} />

                        <View style={styles.bottomRow}>

                            <View style={{ flex: 5, maxWidth: 400 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 20, paddingLeft: 20 }}>Breakdown</Text>
                                <PieChart chartData={chartData[0]} style={styles.pieCard} />
                            </View>

                            <Spacer saOrientation={GLOBALS.ORIENTATIONS.VERTICAL} />


                            <View style={{ flex: 5 }}>

                                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 20 }}>Activity</Text>

                                <SafeAreaView style={{ flex: 1, height: '20vh' }}>
                                    <FlatList
                                        data={listData}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id}
                                    />
                                    
                                </SafeAreaView>
                            </View>

                        </View>

                        <Spacer saOrientation={GLOBALS.ORIENTATIONS.HORIZONTAL} />

                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20 }}>
                            <View style={{ flex: 5 }}>

                                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 20 }}>Events</Text>

                                <SafeAreaView style={{ flex: 1 }}>
                                    <FlatList
                                        data={listData}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id}
                                    />
                                </SafeAreaView>
                            </View>
                        </View>


                    </ScrollView>
                </SafeAreaView>

                


            </View>
            



            

            //{chartData.map((data, index) => {
                        //    return (
                        //        <View style={{ width: '100%', height: '100%' }}>
                        //            <PieChart key={index} chartData={data} style={styles.pieCard} />
                        //        </View>
                        //    );
                        //})}
        )
    }
}
export default TimeCardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GLOBALS.COLORS.BACKGROUND,
        //flexDirection: 'row',
        //flexWrap: 'wrap',
        //minHeight: '500px'
    },
    topRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        minHeight: 145,
        maxHeight: 145,
        height: 145
    },
    bottomRow: {
        //flex: 1,
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
    pieCard: {
        
    }
});