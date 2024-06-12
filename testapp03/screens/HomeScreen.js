import React from 'react';
import { View, Text, Button, Alert, ScrollView, TextInput, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const clickTest = () => {
    Alert.alert(
        'Confirmation',
        'Are you sure?',
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
    );
};

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView>

            <View>

            <Swiper style={styles.swiper} showsButtons={true} height={'200px'}>
        <View style={styles.slide}>
          <Image
            source={{ uri: 'https://dummyimage.com/600x400/000/fff&text=Image+1' }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{ uri: 'https://dummyimage.com/600x400/000/fff&text=Image+2' }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{ uri: 'https://dummyimage.com/600x400/000/fff&text=Image+3' }}
            style={styles.image}
          />
        </View>
      </Swiper>

                <View></View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                    placeholder="Enter text here..."
                />
                <Button title='send' onPress={clickTest} />

                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 200, // 이미지의 높이를 200으로 변경
    },
  });
