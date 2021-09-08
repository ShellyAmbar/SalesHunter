import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HighlightedObject} from './HighlightedObject';

const HighlightedScrollView = props => {
  const scrollView = () => {
    return (
      <View>
        <Text style={{margin: 20, fontSize: 20, fontWeight: '700'}}>
          {props.title}
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {props.dataList != null &&
            props.dataList.map((data, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => props.onClickItem(data)}>
                {data.image ? (
                  <HighlightedObject
                    onClickStar={props.onClickStar}
                    obj={data}
                  />
                ) : null}
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View>
      {props.dataList && props.dataList.length > 0 ? (
        scrollView()
      ) : (
        <ActivityIndicator color="black" size="large" />
      )}
    </View>
  );
};

export default HighlightedScrollView;
