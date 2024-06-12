import React, { useState } from 'react';
import { TextInput, View, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export const ClientLogin = ({ navigation }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        fetch('http://localhost:8080/client/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientId: id,
                clientPw: password
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const handleIdChange = (text) => {
        setId(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };


    return (
        <View style={styles.container}>
                    <TextInput
                style={styles.input}
                placeholder="ID"
                onChangeText={handleIdChange}
                value={id}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={handlePasswordChange}
                value={password}
                secureTextEntry={true}
            />
            <Button
                title="Login"
                onPress={handleLogin}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default ClientLogin;
