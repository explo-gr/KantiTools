import { Text as RNText } from "react-native"
import { useTranslations } from "../../context/LanguageContext"

const TranslatedText = ({ children, ...props }) => {
    const { t } = useTranslations();

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