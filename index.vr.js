import React from "react";
import { AppRegistry, asset, Pano, Text, View, Mesh, VrButton  } from "react-vr";

// import React from 'react'
// import { useEffect } from "react";
import axios from "axios";

// const EarthMoonVR = () => {

//   useEffect(()=>{
//     axios.get('https://jsonplaceholder.typicode.com/todos/1').then((res, err)=>{
//       console.log("res==>>",res)
//     })
//   },[])

//   return (
//     <View>
//     <Pano source={asset('prism.jpg')}/>
//     <Text
//       style={{
//         backgroundColor: '#777879',
//         fontSize: 0.8,
//         fontWeight: '400',
//         layoutOrigin: [0.5, 0.5],
//         paddingLeft: 0.2,
//         paddingRight: 0.2,
//         textAlign: 'center',
//         textAlignVertical: 'center',
//         transform: [{translate: [0, 0, -3]}],
//       }}>
//       hello
//     </Text>
//   </View>
//   )
// }

// export default EarthMoonVR

// AppRegistry.registerComponent("EarthMoonVR", () => EarthMoonVR);


export default class EarthMoonVR extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    scenes: [
      {
        scene_image: "prism.jpg",
        step: 1,
        navigations: [
          {
            step: 2,
            translate: [0.73, -0.15, 0.66],
            rotation: [0, 36, 0],
          },
        ],
      },
      {
        scene_image: "chess-world.jpg",
        step: 2,
        navigations: [
          {
            step: 3,
            translate: [-0.43, -0.01, 0.9],
            rotation: [0, 140, 0],
          },
        ],
      },
      {
        scene_image: "chess-world.jpg",
        step: 3,
        navigations: [
          {
            step: 4,
            translate: [-0.4, 0.05, -0.9],
            rotation: [0, 0, 0],
          },
        ],
      },
      {
        scene_image: "trial.jpg",
        step: 4,
        navigations: [
          {
            step: 5,
            translate: [-0.55, -0.03, -0.8],
            rotation: [0, 32, 0],
          },
        ],
      },
      {
        scene_image: "chess-world.jpg",
        step: 5,
        navigations: [
          {
            step: 1,
            translate: [0.2, -0.03, -1],
            rotation: [0, 20, 0],
          },
        ],
      },
    ],

    
      current_scene: {},
    };
  }

  componentWillMount() {
    this.setState({
      current_scene: this.state.scenes[0],
    });

    axios.get('https://jsonplaceholder.typicode.com/todos/1').then((res, err)=>{
      console.log("res==>>",res)
    })
  }

  onNavigationClick(item, e) {
    if (e.nativeEvent.inputEvent.eventType === "mousedown" && e.nativeEvent.inputEvent.button === 0) {
        var new_scene = this.state.scenes.find(i => i['step'] === item.step);
        this.setState({
            current_scene: new_scene
        });
    }
}

  render() {

    var that = this;

    console.log("this.state.current_scene.scene_image==>>",this.state.current_scene.scene_image)
    return (
      <View>
        <Pano
          source={asset(this.state.current_scene.scene_image)}
          style={{
            transform: [
              {
                translate: [0, 0, 0],
              },
            ],
          }}
        />
        {this.state.current_scene["navigations"].map(function (item, i) {
          return (
            <View
              key={i}
              style={{
                layoutOrigin: [0.5, 0.5],
                transform: [
                  {
                    translate: item["translate"],
                  },
                  {
                    rotateX: item["rotation"][0],
                  },
                  {
                    rotateY: item["rotation"][1],
                  },
                  {
                    rotateZ: item["rotation"][2],
                  },
                ],
              }}

              onInput = {
                e => that.onNavigationClick(item, e)
            }
            >
              <VrButton
                style={{
                  width: 0.15,
                  height: 0.15,
                  borderRadius: 50,
                  backgroundColor: "blue",
                }}

              ></VrButton>
             </View>
          );
        })}
      </View>
    );
  }
}

AppRegistry.registerComponent("EarthMoonVR", () => EarthMoonVR);

// // import React from 'react';
// // import {
// //   AppRegistry,
// //   asset,
// //   Pano,
// //   Text,
// //   View,
// // } from 'react-vr';

// // export default class EarthMoonVR extends React.Component {
// //   render() {
// //     return (
      // <View>
      //   <Pano source={asset('trial.jpg')}/>
      //   <Text
      //     style={{
      //       backgroundColor: '#777879',
      //       fontSize: 0.8,
      //       fontWeight: '400',
      //       layoutOrigin: [0.5, 0.5],
      //       paddingLeft: 0.2,
      //       paddingRight: 0.2,
      //       textAlign: 'center',
      //       textAlignVertical: 'center',
      //       transform: [{translate: [0, 0, -3]}],
      //     }}>
      //     hello
      //   </Text>
      // </View>
// //     );
// //   }
// // };

// // AppRegistry.registerComponent('EarthMoonVR', () => EarthMoonVR);
