import React, { Component} from 'react'
import * as firebase from 'firebase';
import {firebaseApp} from '../firebaseconfig/firebaseconfig';


export function getDataLop(){
    let array = [];
    firebaseApp.database().ref('Lop').on('value',function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            array.push({
              tenlop : childSnapshot.key,
              id : childData,
            });
          });

          array.sort(function (a,b){
            if(a.id<b.id)return -1;
            if(a.id>b.id)return 1;
            return 0;
        });
    })
    return array;
}

export function getDataMonHoc(){
    let array = [];
    firebaseApp.database().ref('Monhoc').on('value',function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            array.push({
              anh : childData.anh,
              id:childSnapshot.key,
              lop:childData.lop,
              tenmon:childData.tenmon
            });
          });
    })
    return array;
}

export function getDataQuangCao(){
  let array = [];
  firebaseApp.database().ref('Quangcao').on('value',function(snapshot){
      snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          array.push({
            caption : childData.caption,
            url:childData.image,
            title:childData.title,
            linkweb:childData.url,
            show:childData.show
          });
        });
  })
  let temp=[];
  array.forEach(element => {
    if(element.show=="true")
    {
      temp.push({
            caption : element.caption,
            url:element.url,
            title:element.title,
            linkweb:element.linkweb,
            show:element.show
      });
    }
    // console.log("url ne "+element.image);
  });
  return temp;
}

