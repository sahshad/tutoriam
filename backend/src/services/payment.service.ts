import { inject, injectable } from "inversify";
import { IPaymentService } from "../core/interfaces/service/IPaymentService";
import { TYPES } from "../di/types";
import { ICourseRepository } from "../core/interfaces/repository/ICourseRepository";
import stripe from '../config/stripe'

@injectable()
export class PaymentService implements IPaymentService {
    constructor(@inject(TYPES.CourseRepository) private courseRepository:ICourseRepository){}
    
    async createStripeSession(userId: string, courseIds: string[]): Promise<String> {
        const courses = await this.courseRepository.getCoursesByIds(courseIds)
        if(!courses){
          throw new Error("cannot find courses, please try again")
        }

        const totalAmount = courses.reduce((acc, course) => acc + (course.price ? +course.price : 0), 0);

        const lineItems = courses.map(course => ({
            price_data: {
              currency: 'inr',
              unit_amount: course.price ? +course.price * 100 : 0,
              product_data: {
                images:[course.thumbnail],
                name: course.title,
                description: course.description,
              },
            },
            quantity: 1,
          }));

          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            metadata: {
              userId,
              courseIds: courseIds.join(','),
              totalAmount
            },
          });
      
          return session.id!;
    }
}