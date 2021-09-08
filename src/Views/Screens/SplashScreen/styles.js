import {Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {moderateScale, scale} from 'react-native-size-matters';

const styles = background =>
  EStyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 20 : 0,
      backgroundColor: '#ffff',
    },

    SplashScreen_RootView: {
      justifyContent: 'center',
      flex: 1,
      margin: 10,
      position: 'absolute',
      width: '100%',
      height: '100%',
    },

    SplashScreen_ChildView: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export {styles};
