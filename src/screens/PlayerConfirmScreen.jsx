import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import button from '../Styles/Button'
import style from '../Styles/Style'
import text from '../Styles/Text'

const PlayerConfirmScreen = ({ navigation, route }) => {
    const { playerName, nextPlayerIndex } = route.params;

    return (
        <View style={style.containerCenter}>
            <Text style={text.title}>{playerName}</Text>
            <Text style={text.text}>est-ce que c'est toi ?</Text>
            <View style={button.buttonContainer}>
                <TouchableOpacity
                    style={button.button}
                    onPress={() => navigation.navigate('RoleReveal', { currentIndex: nextPlayerIndex })}
                >
                    <Text style={button.buttonText}>C'est moi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PlayerConfirmScreen;