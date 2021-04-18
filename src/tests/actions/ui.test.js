import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Pruebas en ui-actions', () => {

    test('todas las acciones deben de funcionar', async () => {

        const action = setError('Help!!');

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'Help!!'
        });

        const removeErrorAction = removeError();

        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });


        const startLoadingAction = startLoading('Help!!');
    
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });    
    
        const finishLoadingAction = finishLoading('Help!!');

        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });
    });

});