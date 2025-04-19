import { Upload } from "lucide-react";
import { Button } from "../../ui/button";
import { TabsContent } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { useEffect, useRef, useState } from "react";
import profiePlaceholder from "/profile_placeholder.png";
import { getUserProfile, updateProfile } from "@/services/userServices";
import { useDispatch } from "react-redux";
import ChangePassword from "./change-password";

interface User {
  _id: string;
  name: string;
  email: string;
  courses: number;
  title:string
  profileImageUrl: string;
  status: "active" | "blocked";
  createdAt: Date;
}

const AccountSettings = () => {
  const [user, setUser] = useState<User|null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchUser = async () =>{
      const response = await getUserProfile()
      if(response.status === 200){
        const user = response.data.user
        setUser(user)
        setLoading(false)
      }
      setLoading(false)
    }
    fetchUser()
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.name.split(" ")[0]);
      setLastName(user.name.split(" ")[1] || ""); 
      setTitle(user.title);
      setImagePreview(user.profileImageUrl || null);
    }
  }, [user])

  const [firstName, setFirstName] = useState(user?user.name.split(" ")[0]:"");
  const [lastName, setLastName] = useState(user?user.name.split(" ")[1]:'');
  const [title, setTitle] = useState(user?user.title : "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?user.profileImageUrl ? user.profileImageUrl : null : null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const handleUploadClick = () => {
    if (fileInputRef) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("profileImage", image);
    formData.append("name", `${firstName} ${lastName}`);
    formData.append("title", title);
    await updateProfile(formData, dispatch);
  };

  if(loading){
    return <div></div>
  }

  return (
    <TabsContent value="settings" className="space-y-8 pb-20">
      <div>
        <h2 className="mb-6 text-xl font-semibold">Account settings</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="overflow-hidden rounded-md bg-gray-100">
              <div className="relative aspect-square w-full">
                <img
                  src={imagePreview ? imagePreview : profiePlaceholder}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="px-10 pb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-2 w-full"
                  onClick={handleUploadClick}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    First name
                  </label>
                  <Input
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Last name
                  </label>
                  <Input
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Username
                </label>
                <Input readOnly placeholder="Username" value={user?user.name:""} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input readOnly type="email" value={user?user.email:''} />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="block text-sm font-medium">Title</label>
                  <span className="text-xs text-muted-foreground">1/50</span>
                </div>
                <Input
                  maxLength={50}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <Button className="" onClick={handleSaveClick}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePassword/>
    </TabsContent>
  );
};

export default AccountSettings;
