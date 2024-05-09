import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            {players.map((player, index) => (
                <View key={index} style={{ margin: 10 }}>
                    <Button title={player.name} onPress={() => onVote(player)} />
                </View>
            ))}
            {selectedPlayer && (
                <View style={{ marginTop: 20 }}>
                    <Text>Vous avez sélectionné: {selectedPlayer.name}</Text>
                    <Button title="Confirmer le vote" onPress={confirmVote} />
                </View>
            )}
        </ScrollView>
    );
};

export default VoteScreen;