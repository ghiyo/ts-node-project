// /lib/routes/crmRoutes.ts

import { Request, Response } from "express";
import { ContactController } from "../controllers/crmController";
import { NextFunction } from "connect";



export class Routes {
    
    public contactController: ContactController = new ContactController();
    
    public routes(app): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfull!!!!!!!'
            })
        })

        // Contact
        app.route('/contact')
        // GET endpoint
        .get((req: Request, res: Response, next: NextFunction) => {
            if (req.query.key !== '35bfb967208c1f7dd7bb3e0bbcaec0bbc798d924'){
                res.status(401).send('You shall not pass!');
            } else {
                next();
            }
        }, this.contactController.getContacts)
        // POST endpoint
        .post(this.contactController.addNewContact)

        // Contact detail
        app.route('/contact/:contactId')
        // edit specific contact
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact)
    }
}