import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/constant";
import { toast } from "sonner";

const Login = () => {
   const [showpassword, setshowpassword] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()
  const [formdata, setformdata] = useState({
    emailId: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(BASE_URL+"/auth/login",
        formdata,
        {withCredentials:true,
           headers: {
         "Content-Type": "application/json",
       },
        });
      toast.success(res?.data?.message)
      return navigate("/")
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.error(error.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className={"flex justify-center font-bold"}>Login</CardTitle>
          <CardDescription>
            Enter your details to login to your account
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="emailId"
                  type="email"
                  name= "emailId"
                  autoComplete="current-emailId"
                  placeholder="m@example.com"
                  required
                  value={formdata.emailId}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    autoComplete="current-password"

                    value={formdata.password}
                    onChange={handleChange}
                    type={showpassword ? "text" : "password"}
                    placeholder="create a strong password"
                    required
                  />
                  {showpassword ? (
                    <EyeOff
                      onClick={() => setshowpassword(false)}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setshowpassword(true)}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="pt-5">
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="text-gray-700 text-sm">
            Don't have any account {" "}
            <Link
              to={"/auth/signup"}
              className="hover:underline cursor-pointer text-pink-500"
            >
              SignUp
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
