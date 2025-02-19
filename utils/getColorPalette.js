import dark from "../config/colors/dark";
import light from "../config/colors/light";

const colors = { dark, light }
const getColorPalette = (theme) => {
    return theme === 'dark' ? colors.dark : colors.light;
}

export default getColorPalette;
//create stylesheet je noch farb
//use memo für wenn dfarb sich nicht ändert
//ka hans vfergässa