const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// use this for common colors in project

export const commonColor = {
  main: '#4E338C',
  secondary: '#F0F6FE',
  white: '#fff',
  black: '#343434',
  transparent: '#0000',
}

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
