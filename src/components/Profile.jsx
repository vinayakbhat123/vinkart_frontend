import {
  AppWindowIcon,
  CodeIcon,
  Loader2,
  User,
  User2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { BASE_URL, USERLOGO } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { addUser } from "@/Redux/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;

  const [showloading, setShowLoading] = useState(false);

  const [updateUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    address: "",
    phoneNo: "",
    zipCode: "",
    city: "",
    photoUrl: "",
    role:"",
  });

  const [file, setFile] = useState(null);

  // ----------------------------------------------
  // AUTO-HYDRATE REDUX ON PAGE LOAD
  // ----------------------------------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(addUser(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [dispatch]);

  // ----------------------------------------------
  // SYNC FORM WITH REDUX STATE
  // ----------------------------------------------
  useEffect(() => {
    if (user) {
      setUpdateUser({
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        address: user.address,
        phoneNo: user.phoneNo,
        city: user.city,
        zipCode: user.zipCode,
        photoUrl: user.photoUrl,
        role: user.role,
      });
    }
  }, [user]);

  // ----------------------------------------------
  // INPUT HANDLERS
  // ----------------------------------------------
  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      photoUrl: URL.createObjectURL(selectedFile),
    });
  };

  // ----------------------------------------------
  // SUBMIT HANDLER
  // ----------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowLoading(true);

      const formData = new FormData();
      Object.keys(updateUser).forEach((key) => {
        formData.append(key, updateUser[key]);
      });

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.patch(`${BASE_URL}/update/${userId}`, formData, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(addUser(res?.data?.user)); // hydrate Redux
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs
        defaultValue="profile"
        className="max-w-full mx-auto items-center p-6"
      >
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* ----------------- PROFILE TAB ----------------- */}
        <TabsContent value="profile">
          <div className="flex flex-col justify-center items-center bg-gray-100">
            <h1 className="font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>

            <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
              {/* PROFILE PHOTO */}
              <div className="flex flex-col items-center">
                <img
                  src={updateUser.photoUrl || USERLOGO}
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
                />
                <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                  Change Picture
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>

              {/* PROFILE FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-2 shadow-lg p-5 bg-white"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={updateUser.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={updateUser.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="emailId"
                    value={updateUser.emailId}
                    disabled
                    className="bg-gray-200 cursor-not-allowed"
                  />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    name="phoneNo"
                    value={updateUser.phoneNo}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={updateUser.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={updateUser.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label>Zip Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={updateUser.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button className="bg-red-500 hover:bg-red-700 text-white w-full mt-4 py-2">
                  {showloading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        {/* ----------------- ORDERS TAB ----------------- */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Change your password here.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label>Current password</Label>
                <Input type="password" />
              </div>
              <div className="grid gap-3">
                <Label>New password</Label>
                <Input type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
