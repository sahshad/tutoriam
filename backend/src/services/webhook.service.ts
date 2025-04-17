import Stripe from "stripe";
import { IWebhookService } from "../core/interfaces/service/IWebhookService";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IOrderService } from "../core/interfaces/service/IOrderService";
import { IEnrollmentService } from "../core/interfaces/service/IEnrollmentService";
import { ICartService } from "../core/interfaces/service/ICartService";

@injectable()
export class WebhookService implements IWebhookService{
    constructor(
        @inject(TYPES.OrderService) private orderService: IOrderService ,
        @inject(TYPES.EnrollmentService) private enrollmentService: IEnrollmentService,
        @inject(TYPES.CartService) private cartService: ICartService
    ){}
    async handleCheckoutSuccess(session: Stripe.Checkout.Session): Promise<void> {
        const metadata = session.metadata;
        if(!metadata || !metadata.userId || !metadata.courseIds){
            throw new Error("Metadata is missing in session")
        }
        console.log('metadata')
        console.log(metadata)

        const userId = metadata.userId;
        const courseIds = metadata.courseIds.split(',');
        const totalAmount = Number(metadata.totalAmount)
        const paymentIntentId = session.payment_intent as string;

        await this.orderService.createOrder(userId, courseIds,totalAmount, paymentIntentId );
        await this.cartService.clearCart(userId)
        for (const courseId of courseIds) {
            await this.enrollmentService.enrollUserIntoCourse(userId, courseId);
        }

    }
}