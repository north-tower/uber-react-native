import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames"
import MapboxPlacesAutocomplete from "react-native-mapbox-places-autocomplete";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';



const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, User</Text>
      <View style={tw`border-t border-gray-200 flex-shrink z-50`}>
      <View style={{ position: 'relative', zIndex: 100 }}>
        <MapboxPlacesAutocomplete 
            id="destination"
            placeholder="Where To?"
            accessToken='pk.eyJ1IjoibWlraTAwNyIsImEiOiJjbGNxNHd2aGkwMmg1M29reWd2ZGJod2M1In0.f9-OPY7z8IFoBGwdM7zUZw' // MAPBOX_PUBLIC_TOKEN is stored in .env root project folder
            onPlaceSelect={(data) => {
                dispatch(setDestination({
                location: data.geometry.coordinates,
                description: data.place_name
                }))

                navigation.navigate("RideOptionsCard");
                }}
            
            onClearInput={({ id }) => {
                id === "destination" && dispatch(setDestination(null));
            }}
            countryId="ke"
            debounce={400}      
            containerStyle={{
                flex: 0,
                zIndex: 2,
                marginBottom: 12,
            }}
            inputStyle={{
                // backgroundColor: '#00000F',
                fontSize: 18,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingBottom: 0,
            }}      
        />
        </View>


        <NavFavourites />

        </View>

        <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100 z-0 `} >
          <TouchableOpacity onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
            <Icon name="car" type="ionicon" color="white" size={16} />
            <Text style={tw`text-white text-center`}>Riders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex flex-row w-24 px-4 py-3 rounded-full`}>
            <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
            <Text style={tw`text-center`}>Eats</Text>
          </TouchableOpacity>
        </View>

      
    </SafeAreaView>
  )
}

export default NavigateCard

const styles = StyleSheet.create({})