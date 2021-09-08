import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {ADD_TO_FAVORITE_NEWS_REQUEST} from '../../models/favorites/actions';
import ListViewColumn from '../Customs/ListViewColumn';

const mapStateToProps = (state, props) => {
  const {news} = state.favorites;
  const category = props.route.params.category;
  const list = props.route.params.list;

  return {category, list};
};

const mapDispatchToProps = (dispatch, props) => ({
  addToFavoritesNews: favorite => {
    dispatch({
      type: ADD_TO_FAVORITE_NEWS_REQUEST,
      payload: favorite,
    });
  },
});

const CategoryList = ({addToFavoritesNews, category, list}) => {
  const navigation = useNavigation();
  console.log('mapStateToProps', category);
  // const category = props.route.params.category;
  // const list = props.route.params.list;
  useEffect(() => {
    navigation.setOptions({
      title: category,
    });
  }, []);

  const onClickItem = article => {
    navigation.navigate('ArticleDetails', {article});
  };
  const addToFavorites = favorite => {
    addToFavoritesNews(favorite);
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
      }}>
      {console.log(category)}
      <Text style={{margin: 20, fontSize: 20, fontWeight: '700'}}>
        {category}
      </Text>
      <ListViewColumn
        onClickStar={addToFavorites}
        onClickItem={onClickItem}
        dataList={list}
      />
    </View>
  );
};
const CategoryListScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryList);
export default CategoryListScreen;
