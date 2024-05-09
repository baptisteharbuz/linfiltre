import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SecretWordEntryScreen = ({ navigation, route }) => {
    const [secretWord, setSecretWord] = useState('');
    const { playerNames } = route.params;

    const fetchRandomWord = async () => {
        try {
            const response = await fetch('https://trouve-mot.fr/api/random');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.length > 0 && data[0].name) {
                setSecretWord(data[0].name);
                console.log(data[0].name);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch a random word: ' + error.message);
        }
    };

    const handleSecretWordSubmit = () => {
        if (secretWord.trim() === '') {
            Alert.alert("Invalid Input", "Please enter a secret word.");
            return;
        }
        // Stocker le mot secret en utilisant AsyncStorage pour l'utiliser plus tard.
        AsyncStorage.setItem('secretWord', secretWord);

        // Naviguer vers PlayerFlow, en commençant par PlayerConfirmScreen avec le premier joueur
        navigation.navigate('PlayerFlow', { screen: 'PlayerConfirm', params: { playerName: playerNames[0] } });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrez le mot à faire deviner</Text>
            <TextInput
                style={styles.input}
                value={secretWord}
                onChangeText={setSecretWord}
                placeholder="Votre mot"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
            />
            <Button title="Mot aléatoire" onPress={fetchRandomWord} />
            <Button title="Suivant" onPress={handleSecretWordSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    }
});

export default SecretWordEntryScreen;