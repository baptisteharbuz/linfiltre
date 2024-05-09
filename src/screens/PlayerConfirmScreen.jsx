import React from 'react';
import { View, Text, Button } from 'react-native';

const PlayerConfirmScreen = ({ navigation, route }) => {
    const { playerName, nextPlayerIndex } = route.params;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{playerName}</Text>
            <Text>est-ce que c'est toi ?</Text>
            <Button title="C'est moi" onPress={() => navigation.navigate('RoleReveal', { currentIndex: nextPlayerIndex })} />
        </View>
    );
};

export default PlayerConfirmScreen;