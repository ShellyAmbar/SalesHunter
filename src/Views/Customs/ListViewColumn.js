import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ListViewItem from './ListViewItem';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ListViewColumn = props => {
  const dataList = props.dataList;

  const ListView = () => {
    return (
      <ScrollView
        style={{padding: 10, marginBottom: 20, width: SCREEN_WIDTH}}
        horizontal="false">
        {dataList &&
          dataList.map((data, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => props.onClickItem(data)}>
                <ListViewItem onClickStar={props.onClickStar} obj={data} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    );
  };
  return (
    <View>
      {dataList && dataList.length > 0 ? (
        ListView()
      ) : (
        <ActivityIndicator color="black" size="large" />
      )}
    </View>
  );
};

export default ListViewColumn;
