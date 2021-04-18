import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'a',
        name: 'Diego'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: {
            id: '1234',
            title: 'Hola',
            body: 'Mundo',
            date: 0,
            ur: null
        }
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
);

describe('Pruebas en <NoteScreen />', () => {

    test('debe de  mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('debe de llamar la acción - activeNote', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        expect(activeNote).toHaveBeenCalled();
        expect(activeNote).toHaveBeenLastCalledWith(
            '1234',
            {
                id: '1234',
                title: 'Hola de nuevo',
                body: 'Mundo',
                date: 0,
                ur: null
            }
        );
    });

});