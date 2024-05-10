import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonContainer: {
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
    },
    // PlayerNumberContainer
    playerNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    playerNumberText: {
        marginHorizontal: 20,
        fontSize: 18,
    },
});