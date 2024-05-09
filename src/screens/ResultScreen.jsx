import React from 'react';
import { View, Text, Button } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
    const { isInfiltrator, playerName } = route.params;
    const message = isInfiltrator
        ? `${playerName} est bien l'infiltré ! Les villageois ont gagné !`
        : `${playerName} n'est pas l'infiltré, les villageois ont perdu !`;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{message}</Text>
            <Button title="Nouvelle partie" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

export default ResultScreen;