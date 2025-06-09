import { inject, injectable } from "inversify";
import { IPaymentService } from "../core/interfaces/service/IPaymentService";
import { TYPES } from "../di/types";
import { ICourseRepository } from "../core/interfaces/repository/ICourseRepository";
import stripe from "../config/stripe";
import { HttpException } from "../core/exceptions/HttpException";
import { StatusCodes } from "http-status-codes";
import { ICourse } from "../models/Course";
import { ICartService } from "../core/interfaces/service/ICartService";

@injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @inject(TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(TYPES.CartService) private cartService: ICartService
  ) {}

  async createStripeSession(userId: string, courseIds: string[]): Promise<String> {
    const cart = await this.cartService.findOne(userId);
    if (!cart) {
      throw new HttpException("cart not found", StatusCodes.NOT_FOUND);
    }

    if (
      cart.status === "in_progress" &&
      cart.stripeSesstionId &&
      cart.sessionExpiresAt &&
      cart.sessionExpiresAt > new Date()
    ) {
      return cart.stripeSesstionId;
    }

    let courses: ICourse[] = [];

    for (let courseId of courseIds) {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        throw new HttpException("course not found", StatusCodes.NOT_FOUND);
      }
      courses.push(course);
    }

    const totalAmount = courses.reduce((acc, course) => acc + (course.price ? +course.price : 0), 0);

    const lineItems = courses.map((course) => ({
      price_data: {
        currency: "inr",
        unit_amount: course.price ? +course.price * 100 : 0,
        product_data: {
          images: [course.thumbnail],
          name: course.title,
          description: course.description,
        },
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: {
        userId,
        courseIds: courseIds.join(","),
        totalAmount,
      },
    });

    await this.cartService.updateCart(userId, {
      status: "in_progress",
      stripeSesstionId: session.id,
      sessionExpiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    return session.id!;
  }
}