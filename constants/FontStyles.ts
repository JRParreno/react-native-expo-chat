import { Dimensions, PixelRatio, Platform, Text, } from "react-native";

// this is for standard font size

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');
  
  // based on iphone 5s's scale
  const scale = SCREEN_WIDTH / 320;

export const font = {
  header: normalize(17),
  steps: normalize(15),
  title: normalize(14),
  subtitle: normalize(12),
  body: normalize(12),
  label: normalize(11),
  placeHolderText: normalize(10),
  helpText: normalize(9),
  info: normalize(10),
  boxText: normalize(11),
}


export function normalize(size: any) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }