// theme
import palette from '../../theme/palette';

// ----------------------------------------------------------------------

const themePalette = palette('light');

export const presets = [
  // DEFAULT
  {
    name: 'default',
    ...themePalette.primary,
  },
  // CYAN
  // {
  //   name: 'cyan',
  //   // lighter: '#CCF4FE',
  //   // light: '#68CDF9',
  //   // main: '#078DEE',
  //   // dark: '#0351AB',
  //   // darker: '#012972',
  //   // contrastText: '#FFFFFF',
  //   lighter: '#dae3f3', // 4
  //   light: '#b4c7e7', // 3
  //   main: '#2f5597', // 2
  //   dark: '#8faadc', // 1
  //   darker: '#061B64',
  //   contrastText: '#FFFFFF',
  // },
  // PURPLE
  // {
  //   name: 'purple',
  //   // lighter: '#EBD6FD',
  //   // light: '#B985F4',
  //   // main: '#7635dc',
  //   // dark: '#431A9E',
  //   // darker: '#200A69',
  //   // contrastText: '#FFFFFF',
  //   lighter: '#dae3f3', // 4
  //   light: '#b4c7e7', // 3
  //   main: '#2f5597', // 2
  //   dark: '#8faadc', // 1
  //   darker: '#061B64',
  //   contrastText: '#FFFFFF',
  // },
  // BLUE
  // {
  //   name: 'blue',
  //   lighter: '#D1E9FC',
  //   light: '#76B0F1',
  //   main: '#2065D1',
  //   dark: '#103996',
  //   darker: '#061B64',
  //   contrastText: '#FFFFFF',
  // },
  // {
  //   name: 'blue',
  //   lighter: '#dae3f3', // 4
  //   light: '#b4c7e7', // 3
  //   main: '#2f5597', // 2
  //   dark: '#8faadc', // 1
  //   darker: '#061B64',
  //   contrastText: '#FFFFFF',
  // },
  // ORANGE
  // {
  //   name: 'orange',
  //   // lighter: '#FEF4D4',
  //   // light: '#FED680',
  //   // main: '#fda92d',
  //   // dark: '#B66816',
  //   // darker: '#793908',
  //   // contrastText: themePalette.grey[800],
  //   lighter: '#dae3f3', // 4
  //   light: '#b4c7e7', // 3
  //   main: '#2f5597', // 2
  //   dark: '#8faadc', // 1
  //   darker: '#061B64',
  //   contrastText: '#FFFFFF',
  // },
  // RED
  // {
  //   name: 'red',
  //   // lighter: '#FFE3D5',
  //   // light: '#FFC1AC',
  //   // main: '#FF3030',
  //   // dark: '#B71833',
  //   // darker: '#7A0930',
  //   // contrastText: '#FFFFFF',
  //   lighter: '#dae3f3', // 4
  //   light: '#b4c7e7', // 3
  //   main: '#2f5597', // 2
  //   dark: '#8faadc', // 1
  //   darker: '#061B64',
  //   contrastText: '#FFFFFF',
  // },
];

export const defaultPreset = presets[0];
// export const bluePreset = presets[1];

// export const cyanPreset = presets[1];
// export const purplePreset = presets[2];
// export const orangePreset = presets[4];
// export const redPreset = presets[5];

export const presetsOption = presets.map((color) => ({
  name: color.name,
  value: color.main,
}));

export function getPresets(key) {
  return {
    default: defaultPreset,
    // blue: bluePreset,

    // cyan: cyanPreset,
    // purple: purplePreset,
    // orange: orangePreset,
    // red: redPreset,
  }[key];
}
