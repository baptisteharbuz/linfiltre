import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import button from '../Styles/Button'
import style from '../Styles/Style'
import text from '../Styles/Text'

const VoteScreen = ({ navigation }) => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            const storedPlayers = JSON.parse(await AsyncStorage.getItem('Villageois'));
            setPlayers(storedPlayers);
        };

        fetchPlayers();
    }, []);

    const onVote = (player) => {
        setSelectedPlayer(player);
    };

    const confirmVote = () => {
        if (selectedPlayer) {
            navigation.navigate('Result', { isInfiltrator: selectedPlayer.role === "l'infiltré", playerName: selectedPlayer.name });
        }
    };

    return (
        <ScrollView contentContainerStyle={style.containerCenter}>
            <Text style={text.title}>Qui est l'infiltré ?</Text>
            {players.map((player, index) => (
                <View key={index} style={{ margin: 10 }}>
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
                    <Text style={text.text}>Vous avez sélectionné: <Text style={text.bold}>{selectedPlayer.name}</Text></Text>
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