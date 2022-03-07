import React from 'react';
import styles from './input.module.css';

export const Input = ( props ) => {
    const {inputConfig, changeEvent, keyDownEvent, inputVal} = props;
    const {elementType, elementConfig} = inputConfig;
    let inputElement = '';

    switch ( elementType ) {      
        case ('searchInput'):
            inputElement = <input
                            {...elementConfig}
                            value={inputVal}
                            className={styles.search}
                            onKeyDown={(event) => keyDownEvent(event) }
                            onChange={(event) => changeEvent(event.target.value)}
                        />
            break;
    }
    
    return (
        <>
            {inputElement}
        </>
    )
}