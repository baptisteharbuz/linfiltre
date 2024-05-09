import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';

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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Joueurs</Text>
            <View style={styles.playerNumberContainer}>
                <Button title="-" onPress={decrementPlayers} />
                <Text style={styles.playerNumberText}>{numberOfPlayers}</Text>
                <Button title="+" onPress={incrementPlayers} />
            </View>
            {Array.from({ length: numberOfPlayers }, (_, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    value={playerNames[index]}
                    onChangeText={text => handlePlayerNameChange(index, text)}
                    placeholder={`Joueur ${index + 1} Nom`}
                />
            ))}
            <Button title="Suivant" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    playerNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    playerNumberText: {
        marginHorizontal: 20,
        fontSize: 18,
    },
});

export default PlayerSetupScreen;