import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, AppState } from 'react-native';
import { CheckBox } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import button from '../Styles/Button';
import style from '../Styles/Style';
import text from '../Styles/Text';
import input from '../Styles/Input';

const PlayerSetupScreen = ({ navigation }) => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(3);
    const [playerNames, setPlayerNames] = useState(Array(10).fill(''));
    const [masterIndex, setMasterIndex] = useState(null);
    const [isMasterSelected, setIsMasterSelected] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);
    const [inactivityTimer, setInactivityTimer] = useState(null);
    const [infiltratorHistory, setInfiltratorHistory] = useState([]);

    useEffect(() => {
        const clearDataAfterInactivity = async () => {
            try {
                await AsyncStorage.removeItem('players');
                console.log('Données des joueurs supprimées après inactivité');
            } catch (e) {
                console.log('Erreur lors de la suppression des données des joueurs après inactivité', e);
            }
        };

        const handleAppStateChange = (nextAppState) => {
            if (appState === 'active' && nextAppState.match(/inactive|background/)) {
                console.log("L'application est passée en arrière-plan ou est devenue inactive.");
                setInactivityTimer(setTimeout(clearDataAfterInactivity, 5 * 60 * 1000));
            } else if (appState.match(/inactive|background/) && nextAppState === 'active') {
                console.log("L'application est revenue au premier plan.");
                clearTimeout(inactivityTimer);
                setInactivityTimer(null);
            }
            setAppState(nextAppState);
        };

        const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            appStateSubscription.remove();
            clearTimeout(inactivityTimer);
        };
    }, [appState]);

    useEffect(() => {
        // Récupération des données des joueurs depuis AsyncStorage
        const getPlayersFromStorage = async () => {
            try {
                const storedPlayers = await AsyncStorage.getItem('players');
                if (storedPlayers !== null) {
                    const parsedPlayers = JSON.parse(storedPlayers);
                    setNumberOfPlayers(parsedPlayers.length);
                    setPlayerNames(parsedPlayers.map(player => player.name));
                }
            } catch (e) {
                console.log('Erreur lors de la récupération des données des joueurs depuis AsyncStorage', e);
            }
        };

        getPlayersFromStorage();
    }, []);

    const handlePlayerNameChange = (index, value) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = value;
        setPlayerNames(newPlayerNames);
    };

    const handleMasterChange = async (index) => {
        setMasterIndex(index);
        setIsMasterSelected(true);

        const updatedPlayers = playerNames.map((name, i) => ({
            name,
            role: i === index ? "MJ" : "Villageois",
        }));

        try {
            await AsyncStorage.setItem('players', JSON.stringify(updatedPlayers));
        } catch (e) {
            console.log('Erreur lors de la sauvegarde des données des joueurs dans AsyncStorage', e);
        }
    };

    const incrementPlayers = () => {
        if (numberOfPlayers < 10) {
            setNumberOfPlayers(prev => prev + 1);
        }
    };

    const decrementPlayers = () => {
        if (numberOfPlayers > 3) {
            setNumberOfPlayers(prev => prev - 1);
        }
    };

    const randomizeMaster = () => {
        const validIndices = playerNames
            .slice(0, numberOfPlayers)
            .map((name, index) => (name.trim() !== '' ? index : null))
            .filter(index => index !== null);

        if (validIndices.length > 0) {
            const randomIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
            setMasterIndex(randomIndex);
            setIsMasterSelected(true)
        }
    };

    const handleSubmit = async () => {
        const validNames = playerNames.slice(0, numberOfPlayers).filter(name => name.trim() !== '');
        if (validNames.length < numberOfPlayers) {
            alert('Veuillez entrer tous les noms des joueurs.');
            return;
        }

        if (masterIndex === null) {
            alert('Veuillez définir un MJ');
            return;
        }

        const validPlayers = validNames.map((name, index) => ({
            name,
            index,
        })).filter((player) => player.index !== masterIndex);

        const eligiblePlayers = validPlayers.filter(
            (player) => !infiltratorHistory.slice(-2).includes(player.name)
        );

        let infiltratorPlayer;
        if (eligiblePlayers.length > 0) {
            infiltratorPlayer =
                eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
        } else {
            infiltratorPlayer =
                validPlayers[Math.floor(Math.random() * validPlayers.length)];
            setInfiltratorHistory([]);
        }

        const players = validNames.map((name, index) => ({
            name,
            role:
                index === masterIndex
                    ? "MJ"
                    : index === infiltratorPlayer.index
                        ? "Infiltré"
                        : "Villageois",
        }));

        setInfiltratorHistory([...infiltratorHistory, infiltratorPlayer.name]);

        // Sauvegarde des joueurs dans AsyncStorage
        try {
            await AsyncStorage.setItem('players', JSON.stringify(players));
        } catch (e) {
            console.log('Erreur lors de la sauvegarde des données des joueurs dans AsyncStorage', e);
        }

        // Navigation avec les données des joueurs non MJ
        const nonMjPlayers = players.filter(player => player.role !== "MJ");
        navigation.navigate('SecretWordEntry', { playerNames: nonMjPlayers });
    };

    return (
        <ScrollView contentContainerStyle={style.containerPlayerSetup}>
            <Text style={text.title}>Configuration des Joueurs</Text>
            <View style={button.playerNumberContainer}>
                <TouchableOpacity style={button.button} onPress={decrementPlayers}>
                    <Text style={button.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={button.playerNumberText}>{numberOfPlayers}</Text>
                <TouchableOpacity style={button.button} onPress={incrementPlayers}>
                    <Text style={button.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            {Array.from({ length: numberOfPlayers }, (_, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={input.input}
                        value={playerNames[index]}
                        onChangeText={text => handlePlayerNameChange(index, text)}
                        placeholder={`Joueur ${index + 1} Nom`}
                    />
                    <CheckBox
                        checked={masterIndex === index}
                        onPress={() => handleMasterChange(index)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        size={30}
                    />
                </View>
            ))}
            <View style={button.buttonContainer}>
                <TouchableOpacity style={button.button} onPress={randomizeMaster}>
                    <Text style={button.buttonText}>MJ Aléatoire</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button.button} onPress={handleSubmit}>
                    <Text style={button.buttonText}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default PlayerSetupScreen;