import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from './../../assets/logo.png'

export default function SplashScreen(){
    //SafeArea value...
    const edges = useSafeAreaInsets();

    //Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current;

    // Scalling Down Both Logo and Title....
    const sacleLogo = useRef(new Animated.Value(1)).current;
    const sacleTile = useRef(new Animated.Value(1)).current;

    // Offet Animation...
    const moveLogo = useRef(new Animated.ValueXY({x: 0,y:0})).current;
    const moveTitle = useRef(new Animated.ValueXY({x: 0,y:0})).current;

    // Animated Done
    useEffect(()=>{
        // Starting Animation after 500ms....
        setTimeout(()=>{
            // parallel Animation
            Animated.parallel([
                Animated.timing(
                    startAnimation,{
                        toValue: -Dimensions.get('window').height + (edges.top + 65),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    sacleLogo,{
                        //Scaling to 0.35
                        toValue: 0.35, // độ lớn của logo sau khi tranform
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    sacleTile,{
                        //Scaling to 0.8
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,{
                        //Scaling to 0.8
                        toValue: {
                            x:(Dimensions.get('window').width /2) - 35 ,
                            y: (Dimensions.get('window').height /2) -5 // di chuyển logo theo trục y
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,{
                        //Moving right most...
                        toValue: {
                            x: 0,
                            y: (Dimensions.get('window').height /2) - 90
                        },
                        useNativeDriver: true
                    }
                ),
            ])
            .start();
        }, 500)
    }, [])

    return(
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left:0,
            right:0,
        }}>
            <Animated.View style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            transform:[
                {translateY: startAnimation}
            ] 
        }}>

        <Animated.View style={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            
            
        }}>
            <Animated.Image source={Logo} style={{
                width: 175,
                height: 175,
                marginBottom: 20,
                transform: [
                    {translateX: moveLogo.x}, // Tranform theo trục x, y
                    {translateY: moveLogo.y},
                    {scale: sacleLogo},
                    
                ]
            }}></Animated.Image>
            <Animated.Text style={{
                fontSize: 18,
                color: '#0070C0',
                fontWeight: 'bold',
                transform: [
                    {translateY: moveTitle.y},
                    {scale: sacleTile}
                ]

            }}>Đại học Kỹ Thuật - Công Nghệ Cần Thơ</Animated.Text>
        </Animated.View>
        </Animated.View>
        <Animated.View>
            
        </Animated.View>
        </View>
    );
}