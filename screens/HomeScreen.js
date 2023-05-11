import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/navOptions';
import MapboxPlacesAutocomplete from "react-native-mapbox-places-autocomplete";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin} from "../slices/navSlice";

const HomeScreen = () => {
    const dispatch = useDispatch();
  return (

    <SafeAreaView  style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
        <Image style={{ width: 100, height: 100, resizeMode: 'contain' }}
         source={{ uri: 'https://links.papareact.com/gzs' }} />
         <MapboxPlacesAutocomplete 
            id="origin"
            placeholder="Where To?"
            accessToken='pk.eyJ1IjoibWlraTAwNyIsImEiOiJjbGNxNHd2aGkwMmg1M29reWd2ZGJod2M1In0.f9-OPY7z8IFoBGwdM7zUZw' // MAPBOX_PUBLIC_TOKEN is stored in .env root project folder
            onPlaceSelect={(data) => {
                dispatch(setOrigin({
                location: data.geometry.coordinates,
                description: data.place_name,
                }));
                dispatch(setDestination(null));
                
                }}
            
            onClearInput={({ id }) => {
                id === "origin" && dispatch(setOrigin(null));
            }}
            countryId="ke"
            debounce={400}      
            containerStyle={{
                marginBottom: 12,
                flex: 0,
                zIndex: 1,
            }}
            inputStyle={{
                fontSize: 18,
            }}    
            
            
            />

            <NavOptions />



        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})