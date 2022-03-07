import React, {useState, useEffect} from 'react';
import {MapItems} from '../../commonUI/listMap/mapListItem';
import {SearchListView} from '../list/listView';
import {Input} from '../../commonUI/input/input';
import {debounce} from '../../utils/delay';

import styles from './searchList.module.css';

export default function SearchList(props) {
    const {mockUserData, notFoundMsg, searchConfig} = props;
    const emptyArr = [];
    const [inputVal, setInput] = useState('');
    const [filteredList, setFilteredList] = useState(emptyArr);
    const [cursor, setCursor] = useState(0);
    const [hovered, setHovered] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const debounceOnChange = React.useCallback(debounce(filterArray, 500), []);

    /**
     * Set the hovered item index
     * @param {Object} Event target 
     * @return {undefined}
     */
    function hoverItem(event, item) {
        if(!!event) {
            event.stopPropagation();
        }
        if(typeof item !== 'undefined' && event) {
            setHovered(item);
        }
    }

    useEffect(() => {
        let mounted = true;
        if (filteredList.length && typeof hovered !== 'undefined' && mounted) {
            setCursor(filteredList.indexOf(hovered));

            return () => {
                setCursor(undefined);
            };
        }
        return () => mounted = false;
    }, [hovered, filteredList]);

    /**
     * Manage input change
     *
     * @param  {searchItem} User Input to search
     * @return {undefined}
     */
    function handleChange(searchItem) {
        setInput(searchItem);
        setLoading(true);
        debounceOnChange(searchItem);
    }

    function handleSelected(item) {
        setInput(item.name);
    }

    /**
     * Filters an array of objects using user input.
     *
     * @return {Array}
     */
    function filterArray(inputVal) {
        let searchItem = inputVal;
        let params = {filterList: []}, matchedList = [];

        if(searchItem) {
            setFilteredList(emptyArr);
            for(let item of Object.values(mockUserData)) {
                for(let value of Object.values(item)) {
                    searchItem = searchItem.toLowerCase();
                    params.items = {...item};
                    params.searchItem = searchItem;

                    if(value.constructor === Array) {
                        for(let element of Object.values(value)) {
                            params.value = element;
                            params.itemMatchFound = null;
                            matchedList = includeMatchedItem(params)

                            if(matchedList)  break;
                        }
                        if(matchedList)  break;
                    } else {
                        params.value = value;
                        params.itemMatchFound = false;
                        matchedList = includeMatchedItem(params);
                        
                        if(matchedList)  break;
                    }
                }
            }
            setFilteredList(params.filterList);
            setLoading(false);
        } else {
            setFilteredList(emptyArr);
            setLoading(false);
        }
    }

    /**
     * Search for the searched item in the list and update the list with filtered items
     * @param {Object} params All Paramters
     * @return {Boolean}
     */
    function includeMatchedItem(params) {
        let {value, searchItem, itemMatchFound, items} = params;
        value = value.toLowerCase();

        if(value.includes(searchItem)) {
            items.itemMatchFound = itemMatchFound === null ? true : false;
            let updateList = [...params.filterList, items];
            params.filterList = updateList;
            return true;
        }
        return false;
    }

    /**
     * Arrow up/down button should select next/previous list element
     * @param {Object} e Event Object
     */
    function handleKeyDown(e) {
        if (e.keyCode === 38 && cursor > 0) {
            setCursor(cursor - 1);
        } else if (e.keyCode === 40 && cursor < filteredList.length - 1) {
            setCursor(cursor + 1);
        }
    }
    return ( 
        <div className={styles.searchContainer}>
            <Input inputConfig={searchConfig.searchInput} changeEvent={handleChange} keyDownEvent={handleKeyDown } inputVal={inputVal}/>
            {
               
                <MapItems listContainer={styles.searchResults} noMatchMsg={notFoundMsg} loading={loading}
                searchTerm={inputVal} items={filteredList} render={(item, index) => (
                    <SearchListView key={item.id} setSelected={handleSelected}  item={item} index={index} cursor={cursor} searchTerm={inputVal} 
                    mouseMoveEvent={hoverItem} mouseLeaveEvent={hoverItem}/>
                )}/> 
            }
        </div>
    );
}
