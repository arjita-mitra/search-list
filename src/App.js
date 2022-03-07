import React from 'react';

import {mockUserData} from './static/mockData.js';
import SearchList from './commonUI/search/searchList';
import {NO_MATCH_FOUND} from './constants/searchListConstants';

import './App.css';

function App() {
    const searchConfig = {
        searchInput: {
            elementType: 'searchInput',
            elementConfig: {
                id: 'searchUser',
                name: 'searchInput',
                type: 'search',
                placeholder: 'Search users by ID, address, name'
            },
            value: ''
        }
    }
    return (
        <div className="App">
            <SearchList mockUserData={mockUserData} notFoundMsg={NO_MATCH_FOUND} searchConfig={searchConfig}/>
        </div>
    );
}

export default App;
