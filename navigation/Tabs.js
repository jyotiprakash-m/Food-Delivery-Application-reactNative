import React from 'react'
import { View, Text,Image,TouchableOpacity } from 'react-native'

import {createBottomTabNavigator,BottomTabBar} from '@react-navigation/bottom-tabs'
import {Home} from '../screens'

import {COLORS,icons} from '../constants'

const Tab = createBottomTabNavigator();

const tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel:false,
                style:{
                    elevation:0,
                    backgroundColor:'rgba(255,0,0,0.04)',
                }
            }}
        
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIcon:({focused}) =>(
                        <Image
                            source={icons.cutlery}
                            resizeMethod="auto"
                            style={{
                                width:25,
                                height:25,
                                tintColor:focused?COLORS.primary:COLORS.secondary
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Search"
                component={Home}
                options={{
                    tabBarIcon:({focused}) =>(
                        <Image
                            source={icons.search}
                            resizeMethod="auto"
                            style={{
                                width:25,
                                height:25,
                                tintColor:focused?COLORS.primary:COLORS.secondary
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Like"
                component={Home}
                options={{
                    tabBarIcon:({focused}) =>(
                        <Image
                            source={icons.like}
                            resizeMethod="auto"
                            style={{
                                width:25,
                                height:25,
                                tintColor:focused?COLORS.primary:COLORS.secondary
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="User"
                component={Home}
                options={{
                    tabBarIcon:({focused}) =>(
                        <Image
                            source={icons.user}
                            resizeMethod="auto"
                            style={{
                                width:25,
                                height:25,
                                tintColor:focused?COLORS.primary:COLORS.secondary
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default tabs
