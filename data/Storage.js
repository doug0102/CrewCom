import AsyncStorage from '@react-native-community/async-storage';

class Storage {

    constructor() {

    }

    saveData = async (key, val) => {
        try {
            await AsyncStorage.setItem(key, val);
            return true;
        } catch (error) {
            console.log("Unable to save key: " + key);
        }
        return false;
    };

    loadData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.log("Unable to load key: " + key);
        }
        return null;
    };
}

const instance = new Storage();
Object.freeze(instance);

export default instance;