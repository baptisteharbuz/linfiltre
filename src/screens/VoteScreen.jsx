import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import button from '../Styles/Button';
import style from '../Styles/Style';
import text from '../Styles/Text';

const VoteScreen = ({ navigation }) => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const storedPlayers = await AsyncStorage.getItem('players');
                if (storedPlayers !== null) {
                    const parsedPlayers = JSON.parse(storedPlayers);
                    const nonMJPlayers = parsedPlayers.filter(player => player.role !== 'MJ');
                    setPlayers(nonMJPlayers);
                }
            } catch (e) {
                console.log("Erreur lors de la récupération des joueurs depuis AsyncStorage", e);
            }
        };

        fetchPlayers();
    }, []);

    const onVote = (player) => {
        setSelectedPlayer(player);
    };

    const confirmVote = () => {
        if (selectedPlayer) {
            navigation.navigate('Result', { isInfiltrator: selectedPlayer.role === "Infiltré", playerName: selectedPlayer.name });
        }
    };

    return (
        <ScrollView contentContainerStyle={style.containerCenter}>
            <Text style={text.title}>Qui est l'infiltré ?</Text>
            {players.map((player, index) => (
                <View key={index} style={button.buttonContainer}>
                    <TouchableOpacity
                        style={button.button}
                        onPress={() => onVote(player)}
                    >
                        <Text style={button.buttonText}>{player.name}</Text>
                    </TouchableOpacity>
                </View>
            ))}
            {selectedPlayer && (
                <View style={{ marginTop: 20 }}>
                    <Text style={text.text}>Vous avez sélectionné : <Text style={text.bold}>{selectedPlayer.name}</Text></Text>
                    <TouchableOpacity
                        style={button.button}
                        onPress={confirmVote}
                    >
                        <Text style={button.buttonText}>Confirmer le vote</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default VoteScreen;