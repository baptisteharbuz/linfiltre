import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import button from '../Styles/Button';
import style from '../Styles/Style';
import text from '../Styles/Text';
import input from '../Styles/Input';

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
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            Alert.alert('Erreur lors de la récupération aléatoire du mot ' + error.toString());
        }
    };

    const handleSecretWordSubmit = async () => {
        if (secretWord.trim() === '') {
            Alert.alert("Entrez un mot secret pour continuer");
            return;
        }
        await AsyncStorage.setItem('secretWord', secretWord);

        // Naviguer vers le premier joueur non MJ
        navigation.navigate('PlayerFlow', { screen: 'PlayerConfirm', params: { playerName: playerNames[0].name, nextPlayerIndex: 0 } });
    };

    return (
        <View style={style.containerCenter}>
            <Text style={text.title}>Entrez le mot à faire deviner</Text>
            <TextInput
                style={input.input}
                value={secretWord}
                onChangeText={setSecretWord}
                placeholder="Votre mot"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
            />
            <View style={button.buttonContainer}>
                <TouchableOpacity
                    style={button.button}
                    onPress={fetchRandomWord}
                >
                    <Text style={button.buttonText}>Mot aléatoire</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={button.button}
                    onPress={handleSecretWordSubmit}
                >
                    <Text style={button.buttonText}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SecretWordEntryScreen;