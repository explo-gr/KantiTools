import { useContext } from "react"
import { Text as RNText } from "react-native"

import { LanguageContext } from "../translations/handler"

const TranslatedText = ({ children, ...props }) => {
    const { t } = useContext(LanguageContext);

    if (typeof children !== 'string') {
        console.warn("TranslatedText can only accept strings.");
        return null;
    }

    return (
        <RNText { ...props }>
            { t(children) }
        </RNText>
    )
}

export default TranslatedText;