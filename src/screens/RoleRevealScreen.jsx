import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoleRevealScreen = ({ navigation, route }) => {
    const [players, setPlayers] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(route.params?.currentIndex || 0);
    const [role, setRole] = React.useState('');
    const [secretWord, setSecretWord] = React.useState('');

    React.useEffect(() => {
        const fetchPlayers = async () => {
            const storedPlayers = JSON.parse(await AsyncStorage.getItem('Villageois'));
            setPlayers(storedPlayers);
            setRole(storedPlayers[currentIndex].role);
            if (storedPlayers[currentIndex].role === "l'infiltré") {
                setSecretWord(await AsyncStorage.getItem('secretWord'));
            }
        };

        fetchPlayers();
    }, [currentIndex]);

    const handleNext = async () => {
        if (currentIndex + 1 < players.length) {
            // Naviguer vers PlayerConfirmScreen avec le nom et l'index du prochain joueur
            navigation.navigate('PlayerConfirm', {
                playerName: players[currentIndex + 1].name,
                nextPlayerIndex: currentIndex + 1
            });
        } else {
            // Tous les joueurs ont vu leur rôle, naviguer vers le nouveau screen
            navigation.navigate('GameCountdown');
        }
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{players[currentIndex]?.name}, ton rôle est : {role}</Text>
            {role === "l'infiltré" && <Text>Le mot secret est : {secretWord}</Text>}
            <Button title="Suivant" onPress={handleNext} />
        </View>
    );
};

export default RoleRevealScreen;