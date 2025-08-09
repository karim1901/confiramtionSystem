"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSeller } from "./_context/sellerContext";

const Page = () => {
  const router = useRouter();

  const {seller , setSeller} = useSeller()

  const [form, setForm] = useState({
    login: true,
    signup: false,
    forget: false,
  });

  const [inputs, setInputs] = useState({
    fullName: "",
    storeName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSignup = async () => {
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const { data } = await axios.post("/api/signup", {
        fullName: inputs.fullName,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        storeName: inputs.storeName,
      });
  
      alert("Account created successfully!");
      setForm({ login: true, signup: false, forget: false });
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed.");
    }
  };
  

  const handleLogin = async () => {
    console.log(inputs)
    try {
      const { data } = await axios.post("/api/login", {
        email: inputs.email,
        password: inputs.password,
      });

      console.log(data)
    setSeller(data.user)
  
    //   alert("Login successful!");
      localStorage.setItem("token", JSON.stringify(data.token));
      router.push("/seller/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  const handleForget = () => {
    alert("Reset link sent (fake)");
  };

  return (
    <div>
      {form.login && (
        <div className="flex justify-center items-center h-screen p-4">
          <div className="w-full  max-w-[400px] bg-white p-4 rounded-md">
            <h1 className="mt-4 font-semibold text-center">Log In</h1>
            <div className="mt-4 flex flex-col gap-2">
              <input
                type="text"
                placeholder="Email or Phone"
                name="email"
                onChange={handleChange}
                className="outline-none border-[1px] border-orange-300 h-[2.3rem] pl-4 w-full rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="outline-none border-[1px] border-orange-300 h-[2.3rem] pl-4 w-full rounded-md"
              />
              <button
                onClick={handleLogin}
                className="bg-black text-white hover:bg-slate-500 h-[2.3rem] w-full rounded-md"
              >
                Log in
              </button>
            </div>
            <div className="text-[.8rem] flex justify-center gap-2 mt-4 text-blue-400 cursor-pointer">
              <p onClick={() => setForm({ login: false, signup: false, forget: true })}>
                Forget Password
              </p>
              <p>-</p>
              <p onClick={() => setForm({ login: false, signup: true, forget: false })}>
                Create account
              </p>
            </div>
          </div>
        </div>
      )}

      {form.signup && (
        <div className="flex justify-center items-center h-screen p-4">
          <div className="w-full  max-w-[400px] bg-white p-4 rounded-md">
            <h1 className="mt-4 font-semibold text-center">Create Account</h1>
            <div className="mt-4 flex flex-col gap-2">
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                onChange={handleChange}
                className="outline-none border-[1px] border-orange-300 h-[2.3rem] pl-4 w-full rounded-md"
              />
              <input
                type="text"
                placeholder="Store Name"
                name="storeName"
                onChange={handleChange}
                className="outline-none border-[1px] border-orange-300 h-[2.3rem] pl-4 w-full rounded-md"
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={handleChange}
                className="outline-none border-[1px] border-orange-300 h-[2.3rem] pl-4 w-full rounded-md"
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                className="outline-none border-[1px] border-orange-300 h-[2.3rem] pl-4 w-full rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="outline-none border-[1px] border-orange-300 h-[2.3rem] pl-4 w-full rounded-md"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                className="outline-none border-[1px] border-orange-300 h-[2.3rem] pl-4 w-full rounded-md"
              />
              <button
                onClick={handleSignup}
                className="bg-black text-white hover:bg-slate-500 h-[2.3rem] w-full rounded-md"
              >
                Sign up
              </button>
            </div>
            <div className="text-[.8rem] flex justify-center gap-2 mt-4 text-blue-400 cursor-pointer">
              <p onClick={() => setForm({ login: false, signup: false, forget: true })}>
                Forget Password
              </p>
              <p>-</p>
              <p onClick={() => setForm({ login: true, signup: false, forget: false })}>
                Log in
              </p>
            </div>
          </div>
        </div>
      )}

      {form.forget && (
        <div className="flex justify-center items-center h-screen p-4">
          <div className="w-full  max-w-[400px] bg-white p-4 rounded-md">
            <h1 className="mt-4 font-semibold text-center">Forget Password</h1>
            <div className="mt-4 flex flex-col gap-2">
              <input
                type="text"
                placeholder="Email or Phone"
                name="email"
                onChange={handleChange}
                className="outline-none border-[1px] border-orange-300 h-[2.3rem] pl-4 w-full rounded-md"
              />
              <button
                onClick={handleForget}
                className="bg-black text-white hover:bg-slate-500 h-[2.3rem] w-full rounded-md"
              >
                Send Message
              </button>
            </div>
            <div className="text-[.8rem] flex justify-center gap-2 mt-4 text-blue-400 cursor-pointer">
              <p onClick={() => setForm({ login: true, signup: false, forget: false })}>
                Log in
              </p>
              <p>-</p>
              <p onClick={() => setForm({ login: false, signup: true, forget: false })}>
                Create account
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
