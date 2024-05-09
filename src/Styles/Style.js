import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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