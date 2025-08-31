import dark from '../../config/colors/accent/dark';
import light from '../../config/colors/accent/light';

const colors = { dark, light };
const getAccentColor = (theme=false, color) => {
    console.log(`[ACCENT COLOR] Attempting to use: ${color}`);

    return theme === 'dark'
        ? colors.dark[color] || colors.dark.yellow
        : colors.light[color] || colors.light.yellow;
};

export default getAccentColor;