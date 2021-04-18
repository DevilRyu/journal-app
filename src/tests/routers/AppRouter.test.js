import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import {firebase} from '../../firebase/firebase-config'
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: {
            id: 'ABC',
            
        }
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {

    test('debe de llamar el login si estoy autenticado', async () => {

        let user;

        await act( async() => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@tisting.com','123456');

            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );

        });

        expect(login).toHaveBeenCalled();
        expect(login).toHaveBeenCalledWith('dnWA2tM8yyPoGv3VIBCnbDq58sK2',null);

    });

});