import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { forgotPassword } from "@/services/authService";
import { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { BarLoader } from "react-spinners";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true)
      const response: AxiosResponse = await forgotPassword(data.email);
      toast.success(response.data.message, {
        position: "top-right",
      });
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">TUTORIAM</h1>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="pb-15">
          <h1 className="text-2xl">Forgot your password?</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4"
        >
          <div className="flex flex-col gap-3">
            <Label className="font-semibold text-sm">
              Enter your registered email
            </Label>
            <Input
              {...register("email")}
              placeholder="Email address"
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 font-mono text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-5">
            {isLoading ? 
          <BarLoader color="#fff" width={280} height={1} />  
          :
            "Submit"
          }
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
