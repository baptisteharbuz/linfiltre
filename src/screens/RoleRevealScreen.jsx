import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity } from 'react-native';
import button from '../Styles/Button';
import style from '../Styles/Style';
import text from '../Styles/Text';

const RoleRevealScreen = ({ navigation, route }) => {
    const [playerRole, setPlayerRole] = useState('');
    const [secretWord, setSecretWord] = useState('');
    const { currentIndex } = route.params;

    useEffect(() => {
        const getPlayerRole = async () => {
            try {
                const storedPlayers = await AsyncStorage.getItem('players');
                if (storedPlayers !== null) {
                    const parsedPlayers = JSON.parse(storedPlayers);
                    const nonMJPlayers = parsedPlayers.filter(player => player.role !== 'MJ');
                    setPlayerRole(nonMJPlayers[currentIndex].role);
                }
            } catch (e) {
                console.log("Erreur lors de la récupération du rôle du joueur depuis AsyncStorage", e);
            }
        };

        const getSecretWord = async () => {
            try {
                const storedSecretWord = await AsyncStorage.getItem('secretWord');
                if (storedSecretWord !== null) {
                    setSecretWord(storedSecretWord);
                }
            } catch (e) {
                console.log("Erreur lors de la récupération du mot secret depuis AsyncStorage", e);
            }
        };

        getPlayerRole();
        getSecretWord();
    }, [currentIndex]);

    const handleNextPlayer = async () => {
        const storedPlayers = await AsyncStorage.getItem('players');
        if (storedPlayers !== null) {
            const parsedPlayers = JSON.parse(storedPlayers);
            const nonMJPlayers = parsedPlayers.filter(player => player.role !== 'MJ');
            const nextIndex = currentIndex + 1;
            if (nextIndex < nonMJPlayers.length) {
                navigation.navigate('PlayerConfirm', { playerName: nonMJPlayers[nextIndex].name, nextPlayerIndex: nextIndex });
            } else {
                // Tous les joueurs ont été affichés, naviguer vers l'écran suivant
                navigation.navigate('GameCountdown');
            }
        }
    };

    return (
        <View style={style.containerCenter}>
            <Text style={text.title}>Votre rôle est :</Text>
            <Text style={text.text}>{playerRole}</Text>
            {playerRole === 'Infiltré' && (
                <Text style={text.text}>Le mot secret est : {secretWord}</Text>
            )}
            <View style={button.buttonContainer}>
                <TouchableOpacity style={button.button} onPress={handleNextPlayer}>
                    <Text style={button.buttonText}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RoleRevealScreen;