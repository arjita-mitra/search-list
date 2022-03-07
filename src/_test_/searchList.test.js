import React from 'react'
import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent } from '@testing-library/react'
import SearchList from '../commonUI/search/searchList';
import {Input} from '../commonUI/input/input';
import {mockUserData} from '../static/mockData.js';
import {NO_MATCH_FOUND} from '../constants/searchListConstants';

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
const placeholder = searchConfig.searchInput.elementConfig.placeholder;
const renderComponent = (searchConfig) => 
    render(<SearchList mockUserData={mockUserData} notFoundMsg={NO_MATCH_FOUND} searchConfig={searchConfig}/>);

test('Search input rendered', () => {
    const { getByPlaceholderText } = renderComponent(searchConfig);
    
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
})

test('On change input', () => {
    const { getByPlaceholderText } = renderComponent(searchConfig);
    const input = getByPlaceholderText(placeholder);
    const changedVal = "ro";
    fireEvent.change(input, {
        target: { value: changedVal }
    });
    expect(input.value).toBe(changedVal)
})

test('Filter list', async () => {
    const { getByPlaceholderText, findAllByText } = renderComponent(searchConfig);
    const input = getByPlaceholderText(placeholder);
    const changedVal = "4xx032";
    fireEvent.change(input, {
        target: { value: changedVal }
    });
    const listItems = await findAllByText(changedVal);
    expect(listItems).toHaveLength(3);
})