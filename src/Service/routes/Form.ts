import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

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
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/upsert', async (req: Request, res: Response) => {
    const { form } = req.body;
    if (!form) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await formDao.upsert(form);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

// router.put('/update', async (req: Request, res: Response) => {
//     const { user } = req.body;
//     if (!user) {
//         return res.status(BAD_REQUEST).json({
//             error: paramMissingError,
//         });
//     }
//     user.id = Number(user.id);
//     await userDao.update(user);
//     return res.status(OK).end();
// });


/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

// router.delete('/delete/:id', async (req: Request, res: Response) => {
//     const { id } = req.params as ParamsDictionary;
//     await userDao.delete(Number(id));
//     return res.status(OK).end();
// });


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;