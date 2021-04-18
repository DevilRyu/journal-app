import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: '1234',
    title: 'Hola',
    body: 'Mundo',
    date: 0,
    url: 'https://algunlugar.com/foto.jpg'
}

const wrapper = mount(
    <Provider store={store}>
        <JournalEntry {...note} />
    </Provider>
);

describe('Pruebas en <JournalEntry />', () => {

    test('debe de  mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('debe de llamar la acción - activeNote', () => {

        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id,{...note})
        );
    });

});