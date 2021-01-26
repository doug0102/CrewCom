class ChatService {
    _chatRooms = [];

    constructor () {
        this._chatRooms = [];
    }

    GetRooms() {
        return this._chatRooms;
    }

    GetRoom(id) {
        for (var i = 0; i < this._chatRooms.length; i++) {
            if (this._chatRooms[i]._id === id)
                return this._chatRooms[i];
        }
        return null;
    }
}

const instance = new ChatService();
Object.freeze(instance);

export default instance;