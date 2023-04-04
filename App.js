import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,Image,SafeAreaView } from "react-native";
import { Video } from "expo-av";
import React, {useState, useEffect} from 'react';
import * as ScreenOrientation from "expo-screen-orientation";
export default function App() {
  const videoFile = require("videoplayerapp/assets/womanflowers.mp4");
  //const thumbnail = require('videoplayerapp/assets/Rectangle.png');
  const [showControls, setShowControls] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [orientation, setOrientation] = useState(ScreenOrientation.Orientation.PORTRAIT);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 5000);
  
    return () => clearTimeout(timer);
  }, []);
  

  useEffect(() => {
    // subscribe to changes in device orientation
    const subscription = ScreenOrientation.addOrientationChangeListener((event) => {
      setOrientation(event.orientation);
    });

    // unsubscribe from the event when the component unmounts
    return () => subscription.remove();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
    {playing ? null : (
      <View>
        <Image style={styles.heart} source={require('videoplayerapp/assets/fav2.png')}></Image>

        {orientation === ScreenOrientation.Orientation.PORTRAIT ? (
        <Image style={styles.logo} source={require('videoplayerapp/assets/logo.jpg')}></Image>
        ) : (
        <Image style={styles.logo2} source={require('videoplayerapp/assets/logo3.jpg')}></Image>
        )}
        
        
        <Image style={styles.share} source={require('videoplayerapp/assets/share3.png')}></Image>
      </View> 
      )}
      <View style={styles.videoview}>
      {/* <View style={styles.mainlogo}> */}
      {/* <Image style={styles.logo} source={require('videoplayerapp/assets/logo.jpg')}></Image> */}
      {/* </View> */}
      <Video
        source={videoFile}
        useNativeControls={true}
        style={{ width: "80%", aspectRatio: 16/ 9 }}
        resizeMode="contain"

        onTap={() => setShowControls(!showControls)}
        posterSource={'videoplayerapp/assets/Rectangle.png'} 

        onPlaybackStatusUpdate={(status) => {
            if (status.isPlaying) {
              setPlaying(true);
            }
            else
            setPlaying(false);
          }}
          
      >
    
  </Video>
  </View>
      <StatusBar style="auto" />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    
  },
  heart:{
    width: 50,
    height: 50,
position: "absolute",
top: 30,
right:10,  
    
        
  },
  share:{
    width: 50,
    height: 50,
position: "absolute",
top: 30,
left:10,  

  },
//   mainlogo:{
// justifyContent: "center",
// alignContent: "center",


//   },

  logo:{
  resizeMode: "center",
    position: "absolute",
    top: 10,
    zIndex:2,
  
    
  },
  logo2:{
    resizeMode: "center",
      position: "absolute",
      top: 10,
      zIndex:5,
    
      
    },
  videoview:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
