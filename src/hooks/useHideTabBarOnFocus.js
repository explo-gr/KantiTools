import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from "react";

import { useTabBarVisibility } from "../context/TabBarVisibilityContext";

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