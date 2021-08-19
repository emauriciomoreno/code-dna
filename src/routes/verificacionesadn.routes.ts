import { Router } from 'express';

import { nuevaVerificacion, getEstadisticas } from './../controllers/verificacionesadn.controller';
import { preValidateDocument } from './../middlewares/controlpanel';

const verificacionesAdnRoutes = Router();
//* Obtiene las estadísticas
verificacionesAdnRoutes.get('/stats', getEstadisticas);

//* Valida una cadena de ADN e indica si tiene mutaciones
//* el middleware preValidateDocument se encarga de validar
//* que la entrada de datos sea correcta
verificacionesAdnRoutes.post('/', preValidateDocument, nuevaVerificacion);

export default verificacionesAdnRoutes;