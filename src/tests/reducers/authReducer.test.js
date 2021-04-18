import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {

    test('debe de realizar el login', async () => {

        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abd',
                displayName: 'Diego'
            }
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({
            uid: 'abd',
            name: 'Diego'
        });

    });

    test('debe de realizar el logout', async () => {

        const initState = {
            uid: 'abd',
            name: 'Diego'
        };

        const action = {
            type: types.logout
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({});

    });

    test('no debe de hacer cambios en el state', async () => {

        const initState = {
            uid: 'abd',
            name: 'Diego'
        };

        const action = {
            type: 'assd'
        };

        const state = authReducer(initState, action);

        expect(state).toEqual(initState);

    });

});