import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Titre en haut */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Trouvez l'Infiltré</Text>
            </View>

            <View style={styles.spacer} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PlayerSetup')}
                >
                    <Text style={styles.buttonText}>Jouer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Rules')}
                >
                    <Text style={styles.buttonText}>Règles du Jeu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    titleContainer: {
        marginTop: 200,
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        // fontWeight: 'bold',
    },
    spacer: {
        flex: 1,
    },
    buttonContainer: {
        marginBottom: 200,
        width: '60%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0056B3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        // fontWeight: 'bold',
    }
});

export default HomeScreen;