import dark from '../../config/colors/palette/dark';
import light from '../../config/colors/palette/light';

const colors = { dark, light };
const getColorPalette = (theme=false) => {
    return theme === 'dark' ? colors.dark : colors.light;
};

export default getColorPalette;