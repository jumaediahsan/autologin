import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
         {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        padding: 3,
        // backgroundColor: 'transparent',
        // flexDirection: 'row',
        // position: 'relative',
        borderRadius: 20

    }
};

export { CardSection };
