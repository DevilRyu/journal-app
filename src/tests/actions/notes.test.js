
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { /*startLoadingNotes, startNewNote, startSaveNote,*/ startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() => {
        return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    })
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '0bNSe9YC0gX7WyDrzep1',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore(initState);

describe('Pruebas en notes-actions', () => {

    //jest.setTimeout(100000);

    beforeEach(() => {
        store = mockStore(initState);
    });

    /*test('debe de crear una nueva nota - startNewNote', async () => {

        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
                url: null
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
                url: null
            }
        });

        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();

    });*/

    /*test('debe cargar las notas - startLoadingNotes', async () => {

        await store.dispatch(startLoadingNotes('TESTING'));

        const actions = store.getActions();

        console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
            url: expect.any(String)
        };

        expect(actions[0].payload[0]).toMatchObject(expected);

    });*/

    /*test('debe de actualizar la nota - startSaveNote', async () => {

        const note = {
            id: '0bNSe9YC0gX7WyDrzep1',
            title: 'title',
            body: 'body'
        }

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

        expect(docRef.data().title).toBe(note.title);
    });*/

    test('debe actualizar el url de la nota - startUploading', async () => {

        const file = new File([],'foto.jpg');

        await store.dispatch(startUploading(file));

        const docRef = await db.doc(`/TESTING/journal/notes/0bNSe9YC0gX7WyDrzep1`).get();

        expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');
    });

});