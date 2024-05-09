import React, { useState, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import LottieView from 'lottie-react-native';

const GameCountdown = ({ navigation }) => {
    const [seconds, setSeconds] = useState(180); // 3 minutes = 180 seconds
    const [timerActive, setTimerActive] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const animationRef = useRef(null);

    const startTimer = () => {
        if (!timerActive) {
            const interval = setInterval(() => {
                setSeconds(s => {
                    if (s === 1) clearInterval(interval);
                    return s - 1;
                });
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

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Temps restant : {formatTime(seconds)}</Text>
            <Button title={timerActive ? "Pause" : "Démarrer le jeu"} onPress={timerActive ? pauseTimer : startTimer} />
            <Button title="Vote" onPress={() => navigation.navigate('Vote')} />
            <LottieView
                ref={animationRef}
                source={require('../../assets/Animations/Timer.json')}
                autoPlay={false}
                loop
                style={{ width: 100, height: 100 }}
            />
        </View>
    );
};

export default GameCountdown;