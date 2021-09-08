import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {
  GET_FAVORITE_REQUEST,
  REMOVE_FROM_FAVORITE_REQUEST,
} from '../../models/favorites/actions';
import ListViewColumn from '../Customs/ListViewColumn';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const mapStateToProps = (state, props) => {
  const {favorites} = state.favorites;
  console.log('mapState', favorites.length);
  return {favorites};
};

const mapDispatchToProps = (dispatch, props) => ({
  getFavoritesNews: () => {
    dispatch({
      type: GET_FAVORITE_REQUEST,
      payload: {},
    });
  },
  removeFromFavoritesNews: favorite => {
    dispatch({
      type: REMOVE_FROM_FAVORITE_REQUEST,
      payload: favorite,
    });
  },
});

const Favorites = ({favorites, getFavoritesNews, removeFromFavoritesNews}) => {
  const navigation = useNavigation();
  //const [list, setList] = useState([]);
  const onClickItem = product => {
    navigation.navigate('ProductDetails', {product});
  };
  const removeFromFavorites = favorite => {
    removeFromFavoritesNews(favorite);
  };

  useEffect(() => {
    getFavoritesNews();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
      }}>
      <Text style={{margin: 20, fontSize: 20, fontWeight: '700'}}>
        Favorites
      </Text>

      {favorites && favorites.length > 0 && (
        <ListViewColumn
          onClickStar={removeFromFavorites}
          onClickItem={onClickItem}
          dataList={favorites}
        />
      )}
    </View>
  );
};
const FavoritesScreen = connect(mapStateToProps, mapDispatchToProps)(Favorites);
export default FavoritesScreen;
