import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatService from '../services/ChatService';
import UserService from '../services/UserService'

import GLOBALS from '../globals';
import Storage from '../data/Storage';

class ChatScreen extends Component {
	
    constructor(props) {
        super(props);

        this.navigation = props.navigation;
        this.params = props.route.params;

        this.state = {
            inverted: false,
            messages: [],
            text: ''
        };
    }

    componentDidMount() {
        this.getMessages();
    }

    async getMessages() {

        // Dummy messages
        var messages = [
            { _id: 0, text: 'Welcome to Chat', createdAt: new Date(), system: true },
            { _id: 1, text: 'What\'s up?', createdAt: new Date(), user: { id: 3, name: 'Joe' } },
        ];

        // Load locally stored messages
        var chat = await Storage.loadData(GLOBALS.STORAGE.CHAT);
        if (chat !== null) {
            messages = JSON.parse(chat);
        }

        // TODO: Load messages from AWS


        // Sort all messages by date
        messages.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1;
            }
            if (a.createdAt < b.createdAt) {
                return 1;
            }
            return 0;
        });

        this.setState({
            messages: messages
        });
    }

    onSend = (messages = []) => {
        this.setState((previousState) => {
            // TODO: Replace sent/received
            const sentMessages = [{ ...messages[0], sent: undefined, received: undefined }];
            return {
                    messages: GiftedChat.append(
                    previousState.messages,
                    sentMessages,
                    Platform.OS !== 'web',
                ),
            }
        }, () => {
            // Save chat to local
            Storage.saveData(GLOBALS.STORAGE.CHAT, JSON.stringify(this.state.messages));
        });
    }

    setCustomText = (text) => {
        this.setState(() => {
            return {
                text: text,
            }
        });
    }
	
    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    text={this.state.text} // this changes internal state management (is typing etc)
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={UserService.currentUser()}
                    onInputTextChanged={text => this.setCustomText(text)}
                    onPressAvatar={(user) => {
                        this.setState({
                            text: this.state.text === '' ? '@' + user.name + ' ' : this.state.text + ' @' + user.name
                        });
                    }}
                    onLongPressAvatar={(user) => {
                        this.navigation.navigate(GLOBALS.SCREENS.PROFILE.ROUTE, {
                            user: user,
                        });
                    }}
                    scrollToBottom
                />
            </View>
		)
    }
}
export default ChatScreen;

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: GLOBALS.COLORS.BACKGROUND
	}
});