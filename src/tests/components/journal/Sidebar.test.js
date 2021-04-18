import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
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
        active: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <Sidebar />
    </Provider>
);

describe('Pruebas en <SideBar />', () => {

    test('debe de  mostrarse correctamente', async () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('debe de llamar la acción - startLogout', async () => {

        wrapper.find('button').prop('onClick')();

        expect(startLogout).toHaveBeenCalled();
    });

    test('debe de llamar la acción - startNewNote', async () => {

        wrapper.find('.journal__new-entry').prop('onClick')();

        expect(startNewNote).toHaveBeenCalled();
    });

});