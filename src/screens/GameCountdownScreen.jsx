import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import button from '../Styles/Button';
import style from '../Styles/Style';
import text from '../Styles/Text';

const GameCountdown = ({ navigation }) => {
    const [seconds, setSeconds] = useState(180);
    const [timerActive, setTimerActive] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (seconds === 0) {
            endGame();
        }
    }, [seconds]);

    const startTimer = () => {
        if (!timerActive && seconds > 0) {
            const interval = setInterval(() => {
                setSeconds(s => s - 1);
            }, 1000);
            setIntervalId(interval);
            setTimerActive(true);
            animationRef.current.play();
        }
    };

    const pauseTimer = () => {
        if (timerActive) {
            clearInterval(intervalId);
            setIntervalId(null);
            setTimerActive(false);
            animationRef.current.pause();
        }
    };

    const endGame = () => {
        clearInterval(intervalId);
        setTimerActive(false);
        animationRef.current.pause();
        // Option 1: Afficher un message d'alerte
        Alert.alert("Temps écoulé", "Le temps est écoulé, les villageois ont perdu", [
            { text: "OK", onPress: () => navigation.navigate('Home') }
        ]);
        // Option 2: Naviguer vers une nouvelle page
        // navigation.navigate('GameOver', { message: "Le temps est écoulé, les villageois ont perdu" });
    };

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return (
        <View style={style.containerCenter}>
            <Text style={text.text}>Temps restant :</Text>
            <Text style={text.title}>{formatTime(seconds)}</Text>
            <View style={button.buttonContainer}>
                <TouchableOpacity
                    style={button.button}
                    onPress={timerActive ? pauseTimer : startTimer}
                >
                    <Text style={button.buttonText}>{timerActive ? "Pause" : "Démarrer le jeu"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={button.button}
                    onPress={() => navigation.navigate('Vote')}
                >
                    <Text style={button.buttonText}>Vote</Text>
                </TouchableOpacity>
            </View>
            <LottieView
                ref={animationRef}
                source={require('../../assets/Animations/Timer.json')}
                autoPlay={false}
                loop
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
};

export default GameCountdown;