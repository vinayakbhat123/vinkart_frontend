import { AppWindowIcon, CodeIcon } from "lucide-react";

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

const Profile = () => {
  const params = useParams();
  const userId = params;
  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs
        defaultValue="profile"
        className={"max-w-full mx-auto items-center p-6"}
      >
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div>
            <div className="flex flex-col justify-center items-center bg-gray-100">
              <h1 className="font-bold mb-7 text-2xl text-gray-800">
                Update Profile
              </h1>
              <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
                {/* profile picture */}
                <div className="flex flex-col items-center">
                  <img
                    src="/vite.svg"
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover
                  border-4 border-pink-800"
                  />
                  <Label
                    className={
                      "mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                    }
                  >
                    Change Picture
                    <input type="file" accept="image/*" className="hidden" />
                  </Label>
                </div>
                {/* profile form */}
                <form className="space-y-2 shadow-lg p-5 bg-white ">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="">
                      <Label className={"block text-sm font-medium"}>
                        FirstName
                      </Label>
                      <Input
                        type={"text"}
                        name={"firstName"}
                         placeholder={"Enter your Firstname"}
                        className={"w-full border rounded-lg"}
                      />
                    </div>
                    <div className="">
                      <Label className={"block text-sm font-medium"}>
                        LastName
                      </Label>
                      <Input
                        type={"text"}
                        name={"lastName"}
                         placeholder={"Enter your Lastname"}
                        className={"w-full border rounded-lg"}
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label className={"block text-sm font-medium"}>Email</Label>
                    <Input
                      type={"email"}
                      name={"email"}
                      disabled
                      className={
                        "w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                      }
                    />
                  </div>
                  <div className="">
                    <Label className={"block text-sm font-medium"}>
                      Phone Number
                    </Label>
                    <Input
                      type={"text"}
                      name={"phoneno"}
                      placeholder={"Enter your Contact no"}
                      className={"w-full border rounded-lg px-3 py-2 mt-1"}
                    />
                  </div>
                    <div className="">
                    <Label className={"block text-sm font-medium"}>
                      Address
                    </Label>
                    <Input
                      type={"text"}
                      name={"address"}
                      placeholder={"Enter your Address"}
                      className={"w-full border rounded-lg px-3 py-2 mt-1"}
                    />
                  </div>
                    <div className="">
                    <Label className={"block text-sm font-medium"}>
                      City
                    </Label>
                    <Input
                      type={"text"}
                      name={"city"}
                      placeholder={"Enter your City"}
                      className={"w-full border rounded-lg px-3 py-2 mt-1"}
                    />
                  </div>
                    <div className="">
                    <Label className={"block text-sm font-medium"}>
                      zip code
                    </Label>
                    <Input
                      type={"text"}
                      name={"zipcode"}
                      placeholder={"Enter your zip code"}
                      className={"w-full border rounded-lg px-3 py-2 mt-1"}
                    />
                  </div>
                  <Button className={"bg-red-500 hover:bg-red-700 text-white rounded-lg w-full mt-4 py-2 font-semibold"}>Update Profile</Button>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders"> 
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
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
