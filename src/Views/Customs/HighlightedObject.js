import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const HighlightedObject = props => {
  const obj = props.obj;
  return (
    <View style={{height: 240, width: 200, margin: 10}}>
      <Image
        source={{uri: `${obj.image}`}}
        style={{height: 200, width: 200, borderRadius: 10}}
      />

      <View
        style={{
          justifyContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20%',
          width: '100%',
          borderRadius: 10,
          marginTop: -40,
          paddingStart: 5,
          backgroundColor: 'rgba(255, 0, 0, 0.4)',
        }}>
        <TouchableOpacity onPress={() => props.onClickStar(obj)}>
          <Icon name="star-outline" size={30} color={'#FFFF'} />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          marginTop: 10,
          fontSize: 12,
          width: '100%',
          textAlign: 'justify',
          fontWeight: '700',
        }}>
        {obj.title}
      </Text>
    </View>
  );
};

export {HighlightedObject};
