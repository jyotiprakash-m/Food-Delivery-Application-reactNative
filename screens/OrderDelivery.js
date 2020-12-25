import React, { useState,useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from "../constants"

const OrderDelivery = ({ route, navigation }) => {

    const [restaurant, setRestaurant] =useState(null)
    const [streetName, setStreetName] =useState("")
    const [fromLocation, setFromLocation] =useState(null)
    const [toLocation, setToLocation] =useState(null)
    const [region, setRegion] =useState(null)

    const [duration, setDuration] =useState(0)
    const [isReady, setIsReady] =useState(false)
    const [angle, setAngle] =useState(0)

    useEffect(() => {
        let { restaurant, currentLocation } = route.params;

        let fromLoc = currentLocation.gps
        let toLoc = restaurant.location
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }

        setRestaurant(restaurant)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)

    }, [])

    // Destination marker function
    

    function renderMap(){
        function destinationMarker(){
            return(
                <Marker coordinate={fromLocation}>
                <View style={{
                    height:40,
                    width:40,
                    borderRadius:20,
                    alignItems:"center",
                    justifyContent:'center',
                    backgroundColor:COLORS.white
                }}>
                    <View style={{
                        height:30,
                        width:30,
                        borderRadius:15,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:COLORS.primary
                    }}>
                        <Image 
                        source={icons.pin}
                        style={{
                            width:25,
                            height:25,
                            tintColor:COLORS.white
                        }}/>

                    </View>
                </View>
            </Marker>
            )
        }

        function carIcon(){
            return(
                <Marker
                anchor={{x:0.5,y:0.5}}
                flat={true}
                coordinate={toLocation}>
                    <View style={{
                        width:48,
                        height:48,
                        borderRadius:24,
                        backgroundColor:COLORS.primary,
                        alignItems:"center",
                        justifyContent:'center'

                        
                    }}>
                        <Image
                        source={icons.restaurant}
                            style={{
                                width:45,
                                height:45,
                                
                            }}
                        />

                    </View>
                    

                </Marker>
            )
        }

        return(
            <View style={{flex:1}}>
                <MapView 
                style={{flex:1}} 
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                >
                    {destinationMarker()}

                    {carIcon()}

                </MapView>
            </View>
        )
    }

    // Destinationheader function

    function renderDestinationHeader() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 30,
                    left: 0,
                    right: 0,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: SIZES.width * 0.9,
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white
                    }}
                >
                    <Image
                        source={icons.red_pin}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: SIZES.padding
                        }}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={{ ...FONTS.body3 }}>{streetName}</Text>
                    </View>

                    <Text style={{ ...FONTS.body3 }}>{Math.ceil(duration)} mins</Text>
                </View>
            </View>
        )
    }
    function renderDeliveryInfo() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 30,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        width: SIZES.width * 0.9,
                        paddingVertical: SIZES.padding * 3,
                        paddingHorizontal: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Avatar */}
                        <Image
                            source={restaurant?.courier.avatar}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.padding }}>
                            {/* Name & Rating */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={icons.star}
                                        style={{ width: 18, height: 18, tintColor: COLORS.primary, marginRight: SIZES.padding }}
                                    />
                                    <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
                                </View>
                            </View>

                            {/* Restaurant */}
                            <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.padding * 2,
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 50,
                                marginRight: 10,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                            onPress={() => navigation.navigate("Home")}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 50,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    


    return (
        <View style={{ flex: 1 }}>
            {renderMap()}
            {renderDestinationHeader()}
            {renderDeliveryInfo()}
        </View>
    )
}

export default OrderDelivery;