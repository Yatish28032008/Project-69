import React from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    handleBarCodeScanned = async({type,data})=> {
        this.setState({
            scanned:true,
            scannedData: data,
            buttonState:'normal'
        })
    }


    getCameraPermissions = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
            hasCameraPermissions : status === "granted"
        });
    }
    render(){
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState==='clicked' && hasCameraPermissions){
return(
    <BarCodeScanner
    onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
    />
)
      }
        else if(buttonState==='normal'){
        return(
            <View>
                <Text>
                    hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
                </Text>
                <Image
                source = {require('./assets/220px-Barcode-scanner')}
                />
            <TouchableOpacity
            onPress={this.getCameraPermissions}
            title = "Bar Code Scanner"
            >
                <Text>Scan QR Code</Text>
            </TouchableOpacity>
            </View>
        )
    }
}
}