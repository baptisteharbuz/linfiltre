import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerHome: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    spacer: {
        flex: 1,
    },
    containerPlayerSetup: {
        padding: 20,
        alignItems: 'center',
    },
    containerCenter: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    timerContainer: {
        height: 200,
        aspectRatio: 1,
    },
    timer: {
        flex: 1,
    }
});