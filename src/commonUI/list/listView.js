import React from 'react';
import {HighlightTxt} from '../highlighter/highlight';
import styles from './listView.module.css';

export const SearchListView = (props) => {
    let {item, searchTerm, index, cursor, mouseMoveEvent, mouseLeaveEvent, setSelected} = props;
    let fieldRef = React.useRef(null);

    React.useEffect(() => {
        let mounted = true;
        if (cursor === index && !!fieldRef.current && !!fieldRef.current.scrollIntoView && mounted) {
            fieldRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
        return () => mounted = false;
    }, [cursor,index]);

    return (   
        <div ref={fieldRef} onMouseMove={(event) => mouseMoveEvent(event, item, cursor)} onMouseOut={() => mouseLeaveEvent(undefined)} onClick={() => setSelected(item)} >
            <li data-name={item.name} className={cursor === index ? `${styles.searchResultsList} ${styles.active}` : `${styles.searchResultsList} ${styles.notActive}`}>
                <p><HighlightTxt text={item.id} highlight={searchTerm}/></p>
                <p><HighlightTxt text={item.name} highlight={searchTerm}/></p>
                {
                    item.itemMatchFound ?
                        <span className={styles.foundInItem}>{searchTerm} found in items</span>
                    : null
                }
                <p title={item.address} className={styles.textEllipsis}><HighlightTxt text={`${item.address}, ${item.pincode}`} highlight={searchTerm}/></p>
            </li>
        </div>
    );
}