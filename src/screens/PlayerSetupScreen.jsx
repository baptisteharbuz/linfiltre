import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import button from '../Styles/Button'
import style from '../Styles/Style'
import text from '../Styles/Text'
import input from '../Styles/Input'

const PlayerSetupScreen = ({ navigation }) => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const [playerNames, setPlayerNames] = useState(Array(10).fill(''));

    const handlePlayerNameChange = (index, value) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = value;
        setPlayerNames(newPlayerNames);
    };

    const incrementPlayers = () => {
        if (numberOfPlayers < 10) {
            setNumberOfPlayers(prev => prev + 1);
        }
    };

    const decrementPlayers = () => {
        if (numberOfPlayers > 2) {
            setNumberOfPlayers(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        const validNames = playerNames.slice(0, numberOfPlayers).filter(name => name.trim() !== '');
        if (validNames.length < numberOfPlayers) {
            alert('Entrez le nom de tous les joueurs');
            return;
        }

        // Désigner un infiltré au hasard
        const infiltratorIndex = Math.floor(Math.random() * numberOfPlayers);
        const players = validNames.map((name, index) => ({
            name,
            role: index === infiltratorIndex ? "l'infiltré" : 'Villageois'
        }));

        // Sauvegarder les joueurs dans AsyncStorage
        try {
            await AsyncStorage.setItem('Villageois', JSON.stringify(players));
            navigation.navigate('SecretWordEntry', { playerNames: validNames });
        } catch (e) {
            alert('Erreur lors de la sauvegarde du nom des joueurs');
        }
    };

    return (
        <ScrollView contentContainerStyle={style.containerPlayerSetup}>
            <Text style={text.title}>Joueurs</Text>
            <View style={button.playerNumberContainer}>
                <TouchableOpacity
                    style={button.button}
                    onPress={decrementPlayers}
                >
                    <Text style={button.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={button.playerNumberText}>{numberOfPlayers}</Text>
                <TouchableOpacity
                    style={button.button}
                    onPress={incrementPlayers}
                >
                    <Text style={button.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            {Array.from({ length: numberOfPlayers }, (_, index) => (
                <TextInput
                    key={index}
                    style={input.input}
                    value={playerNames[index]}
                    onChangeText={text => handlePlayerNameChange(index, text)}
                    placeholder={`Joueur ${index + 1} Nom`}
                />
            ))}
            <View style={button.buttonContainer}>
                <TouchableOpacity
                    style={button.button}
                    onPress={handleSubmit}
                >
                    <Text style={button.buttonText}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default PlayerSetupScreen;