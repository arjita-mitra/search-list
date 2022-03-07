import React from 'react';
import styles from './mapListItem.module.css';

export const MapItems = (props) => {
    const {items, render, listContainer, noMatchMsg, searchTerm, loading} = props;
   
    return (
        <ul className={listContainer} tabIndex="0">
            {
                items.length && !loading ? 
                    items.map((item, index) => {
                        return render(item, index);
                    })
                : loading ? <p className={styles.notFound}>Loading ...</p> : searchTerm ? <p className={styles.notFound}>{noMatchMsg}</p> : null
            }
        </ul>
    )
}