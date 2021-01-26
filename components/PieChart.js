import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie, VictoryLabel } from '../Victory';
import GLOBALS from '../globals';
//import { setTimeout } from 'timers';

class PieChart extends Component {

    constructor(props) {
        super(props);

        this.chartData = props.chartData;
        this.focused = true;

        this.state = {
            title: props.chartData.title,
            data: (function () {
                var tempData = [];
                for (var i = 0; i < this.chartData.data.length; i++) {
                    tempData.push({
                        x: this.chartData.data[i].x,
                        y: 100 / this.chartData.data.length
                    });
                }
                return tempData;
            }).call(this),
            colors: (function () {
                var tempColors = [];
                for (var i = 0; i < this.chartData.data.length; i++) {
                    tempColors.push(GLOBALS.COLORS.DISABLED);
                }
                return tempColors;
            }).call(this),
        }

        console.log(this.state);
    }

    componentDidMount() {

        setTimeout(() => {
            console.log(this.chartData);
            console.log(this.state);
            for (var i = 0; i < this.chartData.data.length; i++) {
                this.state.data[i].y = this.chartData.data[i].y;
                this.state.colors[i] = this.chartData.colors[i];
            }

            this.setState({
                data: this.state.data,
                colors: this.state.colors
            });
        }, 200)
    }

    handleClick = (prop, tar) => {
        //console.log(tar);

        this.focused = !this.focused;

        return [
            {
                target: "data",
                mutation: ({ style }) => {

                    if (!this.focused) {
                        for (var i = 0; i < this.chartData.colors.length; i++) {
                            if (i !== tar.index) {
                                this.state.colors[i] = GLOBALS.COLORS.DISABLED;
                            }
                        }
                    }
                    else {
                        Object.assign(this.state.colors, this.chartData.colors);
                    }

                    this.setState({
                        colors: this.state.colors
                    });

                    return null;
                }
            },
        ];
    }

    render() {
        return (

            <View style={styles.container}>
                <svg viewBox="0 0 400 400" >
                    <VictoryPie
                        innerRadius={90}
                        standalone={false}
                        data={this.state.data}
                        labels={({ datum }) => (
                            this.focused ? datum.y.toFixed(1) + ' hrs' : datum.x
                        )}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onClick: this.handleClick
                            }
                        }]}
                        colorScale={this.state.colors}
                        style={{
                            data: {
                                fillOpacity: 1,
                                stroke: GLOBALS.COLORS.BACKGROUND,
                                strokeWidth: 3
                            },
                            labels: {
                                fontSize: 20,
                                fill: GLOBALS.COLORS.TEXT
                            }
                        }}
                        animate={{
                            duration: 250
                        }}

                    />
                    <VictoryLabel
                        textAnchor="middle" verticalAnchor="middle"
                        x={200} y={200}
                        style={{ fontSize: 30 }}
                        text={this.state.title}
                    />
                </svg>
            </View>
        )
    }
}
export default PieChart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '200px'
    }
});