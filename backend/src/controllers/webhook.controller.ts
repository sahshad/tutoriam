import { Request, Response } from "express";
import { IWebhookController } from "../core/interfaces/controller/IWebhookController";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IWebhookService } from "../core/interfaces/service/IWebhookService";
import { StatusCodes } from "http-status-codes";

@injectable()
export class WebhookController implements IWebhookController {
    constructor(@inject(TYPES.WebhookService) private webhookService:IWebhookService ){}
  handleStripeWebhook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return
    }

    if (event.type === "checkout.session.completed") {

      const session = event.data.object as Stripe.Checkout.Session;
      console.log(session)
      const result = await this.webhookService.handleCheckoutSuccess(session)
      res.status(StatusCodes.OK).json({received: true})
    } else {
      res.status(200).json({ received: true });
    }
  });
}
