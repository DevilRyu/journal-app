import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dnkc8dljf',
    api_key: '218124649718178',
    api_secret: 'MmZ05uqrhtkoMXwt22xEL_FKdtA'
});

describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL', async () => {

        const resp = await fetch('https://images.ctfassets.net/hrltx12pl8hq/4plHDVeTkWuFMihxQnzBSb/aea2f06d675c3d710d095306e377382f/shutterstock_554314555_copy.jpg');
        const blob = await resp.blob();

        const file = new File([blob], 'foro.jpg');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        //Borrar imagen por id
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');

        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            
        });

    });

    test('debe de returnar un error', async () => {

        const file = new File([], 'foro.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);

    });

});