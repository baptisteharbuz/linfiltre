import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import button from '../Styles/Button'
import style from '../Styles/Style'
import text from '../Styles/Text'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={style.containerHome}>
            {/* Titre en haut */}
            <View style={text.titleContainer}>
                <Text style={text.title}>Trouvez l'Infiltré</Text>
            </View>

            <View style={style.spacer} />

            <View style={button.buttonContainer}>
                <TouchableOpacity
                    style={button.button}
                    onPress={() => navigation.navigate('PlayerSetup')}
                >
                    <Text style={button.buttonText}>Jouer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={button.button}
                    onPress={() => navigation.navigate('Rules')}
                >
                    <Text style={button.buttonText}>Règles du Jeu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;