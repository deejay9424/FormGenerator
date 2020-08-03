import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import FormDao from '../../Data/daos/FormDao';
import { paramMissingError } from '../shared/constants';

// Init shared
const router = Router();
const formDao = new FormDao();

/******************************************************************************
 *                      Get All Forms for a user - "GET /api/form/"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    const result = await new FormDao().getFormInstances(req.body.email);
    return res.status(OK).json(result);
});

/******************************************************************************
 *                       Add New Form - "POST /api/form/addNewForm"
 ******************************************************************************/

router.post('/addNewForm', async (req: Request, res: Response) => {
    const { form } = req.body;
    if (!form) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const result: boolean = await formDao.addNewForm(form);
    return (result) ? res.status(CREATED).end() : res.status(INTERNAL_SERVER_ERROR).end();
});

/******************************************************************************
 *                       Add Fields To Form - "POST /api/form/addFieldsToForm"
 ******************************************************************************/

router.post('/addFieldsToForm', async (req: Request, res: Response) => {
    const { formId, formFields } = req.body;
    if (!formId) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const result: boolean = await formDao.addFieldsToForm(formId,formFields);
    return (result) ? res.status(CREATED).end() : res.status(INTERNAL_SERVER_ERROR).end();
});

/******************************************************************************
 *                    Add Form Instance - "POST /api/form/addFormInstance"
 ******************************************************************************/

router.post('/addFormInstance', async (req: Request, res: Response) => {
    const { formInstance } = req.body;
    if (!formInstance) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const result: boolean = await formDao.addFormInstance(formInstance);
    return (result) ? res.status(CREATED).end() : res.status(INTERNAL_SERVER_ERROR).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;