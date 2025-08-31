import { useCallback, useRef } from "react";
import { useTabBarVisibility } from "../context/TabBarVisibilityContext";
import { useFocusEffect } from '@react-navigation/native'

const useHideTabBarOnFocus = () => {
    const { showBar, hideBar } = useTabBarVisibility();

    useFocusEffect(
        useCallback(() => {
            hideBar();
            return () => showBar();
        }, [hideBar, showBar])
    );
}

export default useHideTabBarOnFocus;