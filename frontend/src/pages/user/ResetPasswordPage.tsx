import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPassword } from "@/services/authService";
import { Eye, EyeOff } from "lucide-react";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;


const ResetPasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token"); 
  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError("Invalid or expired token");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(token, data.confirmPassword)
      if (response.status === 200) {
        navigate("/login")
        toast.success("Password reset successfully. You can now log in.", {
          position: "top-right",
        });
      }
    } catch (err:any) {
      toast.error(err.response.data.message||"Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-6">
        <Link to={"/"}>
        <h1 className="text-xl font-bold">TUTORIAM</h1>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-semibold ">
            <Button variant="link" className="text-gray-600">Go to Login page</Button>
          </Link> 
          </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="pb-15">
          <h1 className="text-2xl">Reset Your Password</h1>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
          <div className="flex flex-col gap-3">
            <Label className="font-semibold text-sm">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                className="pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="nter your new password"
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 font-mono text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label className="font-semibold text-sm">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="password"
                className="pr-10"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                {...register("confirmPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 font-mono text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-5" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}


export default ResetPasswordPage;
