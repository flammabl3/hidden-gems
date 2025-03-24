import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import Explore from '../app/main-app/explore/explore';


const Tab = createBottomTabNavigator();

// this component is used in _layout.tsx inside main-app
export default function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Hides the header for all screens
                tabBarIcon: ({ color, size }) => {

                    // Set icon based on the route name
                    if (route.name === 'Explore') {
                        return <MaterialCommunityIcons name={"map"} color={color} size={size} />;
                    } else {
                        return <MaterialCommunityIcons name={"help-circle-outline"} color={color} size={size} />;
                    }
                },
                tabBarActiveTintColor: '#213141', // Active tab color
                tabBarInactiveTintColor: '#5A6B75', // Inactive tab color
            })}
        >
            { /* tab names come from the app/main-app/ folder */ }
            <Tab.Screen name="Explore" component={Explore} />
        </Tab.Navigator>
    );
}
