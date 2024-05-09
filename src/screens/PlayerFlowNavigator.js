import { createStackNavigator } from '@react-navigation/stack';
import PlayerConfirmScreen from './PlayerConfirmScreen';
import RoleRevealScreen from './RoleRevealScreen';

const Stack = createStackNavigator();

const PlayerFlowNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="PlayerConfirm">
            <Stack.Screen name="PlayerConfirm" component={PlayerConfirmScreen} />
            <Stack.Screen name="RoleReveal" component={RoleRevealScreen} />
        </Stack.Navigator>
    );
};

export default PlayerFlowNavigator;