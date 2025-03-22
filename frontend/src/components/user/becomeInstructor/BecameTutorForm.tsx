import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";

const tutorSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be valid"),
  bio: z.string().min(10, "Bio should be at least 10 characters"),
  experience: z.number().min(0, "Experience should be a positive number"),
  subjects: z.string().min(1, "Select at least one subject"),
});

type TutorFormData = z.infer<typeof tutorSchema>;

const BecomeTutorForm = () => {
  const [uploading, setUploading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<TutorFormData>({
    resolver: zodResolver(tutorSchema),
  });


  const onSubmit = async (data: TutorFormData) => {
    try {
      await axios.post("/api/tutors", data);
      toast.success("Application submitted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 border rounded-xl shadow-md w-full max-w-lg">

      <Input type="tel" placeholder="Phone Number" {...register("phoneNumber")} />
      {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}

      <textarea
        {...register("bio")}
        placeholder="Write about yourself..."
        className="w-full h-32 border rounded-md p-2"
      />
      {errors.bio && <span className="text-red-500">{errors.bio.message}</span>}

      <Input type="number" placeholder="Years of Experience" {...register("experience", { valueAsNumber: true })} />
      {errors.experience && <span className="text-red-500">{errors.experience.message}</span>}

      <Input placeholder="Subjects (comma separated)" {...register("subjects")} />
      {errors.subjects && <span className="text-red-500">{errors.subjects.message}</span>}
      
      <Button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Submit"}
      </Button>
    </form>
  );
};

export default BecomeTutorForm;