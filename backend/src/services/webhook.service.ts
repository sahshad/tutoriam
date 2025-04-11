import Stripe from "stripe";
import { IWebhookService } from "../core/interfaces/service/IWebhookService";

export class WebhookService implements IWebhookService{
    
    async handleCheckoutSuccess(session: Stripe.Checkout.Session): Promise<void> {
        const metadata = session.metadata;
        if(!metadata || !metadata.userId || !metadata.courseIds){
            throw new Error("Metadata is missing in session")
        }
        console.log('metadata')
        console.log(metadata)

        const userId = metadata.userId;
        const courseIds = metadata.courseIds.split(',');

        // await orderRepository.createOrder(userId, courseIds, session);
        // for (const courseId of courseIds) {
        //     await enrollmentRepository.enrollUser(userId, courseId);
        //   }

    }
}