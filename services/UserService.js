import Storage from '../data/Storage';
import GLOBALS from '../globals';

class UserService {

    constructor() {
        
    }

    currentUser = () => {
        return {
            _id: 2,
            name: 'Developer',
        }
    }

    getTimeCard = async (userId) => {
        var value = await Storage.loadData(GLOBALS.STORAGE.TIME + GLOBALS.STORAGE.SEPARATOR + userId.toString());
        if (value) {
            return JSON.parse(value)
        }
        return null;
    }

}

const instance = new UserService();
Object.freeze(instance);

export default instance;