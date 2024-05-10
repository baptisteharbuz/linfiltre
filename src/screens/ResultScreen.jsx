import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import button from '../Styles/Button';
import style from '../Styles/Style';
import text from '../Styles/Text';

const ResultScreen = ({ route, navigation }) => {
    const { isInfiltrator, playerName } = route.params;

    return (
        <View style={style.containerCenter}>
            <Text style={text.title}>{playerName}</Text>
            <Text style={text.text}>
                {isInfiltrator ? "est bien l'infiltré !" : "n'est pas l'infiltré,"}
            </Text>
            <Text style={text.text}>
                {isInfiltrator ? "Les villageois ont gagné !" : "les villageois ont perdu !"}
            </Text>
            <TouchableOpacity
                style={button.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={button.buttonText}>Nouvelle partie</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ResultScreen;