import AsyncStorage from '@react-native-async-storage/async-storage';

class UserData {
    static async getUserData() {
        try {
            const usrJSON = await AsyncStorage.getItem('usrdata');
            if (usrJSON !== null) {
              var data = JSON.parse(usrJSON);
              console.log('data - ', data)
              return data;
            }
            return null;
        }
        catch (e) {
            console.log('exception: ', e);
        }
    };

    static async saveUserData(user) {
        try {
            console.log('saving - ', user);
          var data = user;
          const jsonData = JSON.stringify(data);
          await AsyncStorage.setItem('usrdata', jsonData);
        }
        catch (e) {
          console.log('exception: ', e);
        }
    }
}
export default UserData;