import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';

const OptionsScrollView = props => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {props.dataList.map((data, index) => (
        <TouchableOpacity key={index} onPress={() => props.onClickOption(data)}>
          <View>
            <Text
              style={{
                textTransform: 'uppercase',
                padding: 10,
                borderWidth: 1,
                borderColor: '#800000',
                fontSize: 20,
                margin: 10,
                borderRadius: 10,
              }}>
              {data}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default OptionsScrollView;
