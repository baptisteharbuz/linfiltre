import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import button from '../Styles/Button'
import style from '../Styles/Style'
import text from '../Styles/Text'

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
        <View style={style.containerCenter}>
            <Text style={text.title}>{players[currentIndex]?.name}</Text>
            <Text style={text.text}>Tu es <Text style={text.bold}>{role}</Text></Text>
            {role === "l'infiltré" && (
                <>
                    <Text>Le mot secret est :</Text>
                    <Text style={text.secret}>{secretWord}</Text>
                </>
            )}
            <TouchableOpacity
                style={button.button}
                onPress={handleNext}
            >
                <Text style={button.buttonText}>Suivant</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RoleRevealScreen;