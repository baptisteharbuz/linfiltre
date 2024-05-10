import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const GameRulesScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Règles du jeu</Text>

            <Text style={styles.heading}>Objectif du jeu</Text>
            <Text style={styles.text}>
                Les villageois doivent découvrir le mot secret tout en identifiant l'Infiltré parmi eux.
            </Text>

            <Text style={styles.heading}>Préparation</Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>Sélection des joueurs :</Text> Selection du nombre de joueur et de leur nom.
            </Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>Maître du Jeu :</Text> Une personne est désignée comme Maître du Jeu (MJ) de façon aléatoire ou par vote entre les joueurs. Le MJ n'est pas un joueur et gère le déroulement de la partie. Il pourra participer au vote pour aider les villageois à identifier l'infiltré.
            </Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>Choix du mot secret :</Text> Le MJ choisit un mot secret, soit de manière aléatoire, soit en sélectionnant un mot spécifique.
            </Text>

            <Text style={styles.heading}>Début de la partie</Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>Distribution des rôles :</Text> Chaque joueur valide discrètement sa présence pour connaître son rôle. Les joueurs reçoivent le rôle de "Villageois", à l'exception d'un joueur qui reçoit le rôle "Infiltré". Seul l'Infiltré connaît le mot secret.
            </Text>

            <Text style={styles.heading}>Déroulement du jeu</Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>Tour des questions :</Text> Chaque joueur, y compris l'Infiltré, pose une question au MJ pour essayer de deviner le mot secret. Le MJ ne peut répondre qu'avec "OUI" ou "NON". Les joueurs disposent de 3 minutes maximum pour poser leurs questions chacun leur tour.
            </Text>

            <Text style={styles.heading}>Fin de la partie</Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>Découverte du mot secret :</Text> Si les joueurs découvrent le mot secret avant la fin du temps imparti, ils passent à la phase de vote. Sinon, les joueurs perdent la partie.
            </Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>Vote pour identifier l'Infiltré :</Text> Après la découverte du mot, tous les Villageois ainsi que le MJ discutent pour décider qui parmi eux est l'Infiltré. Un vote est organisé. Si l'Infiltré est correctement identifié, les Villageois gagnent la partie. Si l'Infiltré n'est pas identifié, ou si le mauvais joueur est accusé, l'Infiltré gagne.
            </Text>

            <Text style={styles.heading}>Remarques</Text>
            <Text style={styles.text}>
                L'Infiltré doit faire attention à ne pas révéler son identité tout en guidant subtilement les Villageois vers le mot secret.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    heading: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        marginTop: 10,
        lineHeight: 24,
        textAlign: 'justify',
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default GameRulesScreen;