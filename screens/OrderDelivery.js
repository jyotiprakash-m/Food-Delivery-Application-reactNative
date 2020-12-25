import React from 'react'
import { View, Text } from 'react-native'

const OrderDelivery = () => {

    // Render map function

    function renderMap(){
        return(
            <View>
                <Text>Lets Configure Some things</Text>

            </View>
        )
    }


    return (
        <View style={{flex:1}} >
            {renderMap()}
        </View>
    )
}

export default OrderDelivery
