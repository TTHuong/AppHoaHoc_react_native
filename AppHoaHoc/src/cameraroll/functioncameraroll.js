import React, { Component } from 'react'
import CameraRoll from '@react-native-community/cameraroll';

import {
View,Text,
}from 'react-native';

export function LoadImage()  {
    let photos=[];
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
        // groupTypes:'All',

      })
      .then(r => {
        photos= r.edges ;
      })
      .catch((err) => {
          return null;
      });
    return photos;
    // console.log('lalalal')
}

export default class functioncameraroll extends Component {
    render() {
        return (
            <View>

            </View>
        )
    }
}
