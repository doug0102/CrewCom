import React, { Component } from 'react';
import { View } from 'react-native';
import GLOBALS from '../globals';

class Spacer extends Component {

    constructor(props) {
        super(props);

        this.type = props.saOrientation;
        if (this.type === undefined) {
            this.type = GLOBALS.ORIENTATIONS.HORIZONTAL;
        }

        this.size = props.smSize;
        if (this.size === undefined) {
            this.size = 40;
        }

    }

    render() {

        var containerStyle = { alignSelf: 'center' };
        var borderStyle = { flex: 1 };

        switch (this.type) {
            default:
                console.warn("Unknown orientation type: " + this.type);

            case GLOBALS.ORIENTATIONS.HORIZONTAL:
                containerStyle.height = this.size;
                containerStyle.width = '95%';
                containerStyle.flexDirection = 'column'
                borderStyle.borderBottom = '1px solid #cacaca';
                break;

            case GLOBALS.ORIENTATIONS.VERTICAL:
                containerStyle.height = '95%';
                containerStyle.width = this.size;
                containerStyle.flexDirection = 'row';
                borderStyle.borderRight = '1px solid #cacaca';
                break;
        }

        return (

            <View style={containerStyle}>
                <View style={borderStyle}>

                </View>
                <View style={{ flex: 1 }}>

                </View>
            </View>
        )
    }
}
export default Spacer;