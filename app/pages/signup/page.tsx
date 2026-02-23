"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginPayload, LoginResponse, SignUpPayload, SignUpResponse } from '@/types/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
const SignUp = () => {
  const node_env = process.env.NEXT_PUBLIC_NODE_ENV;
  const api = (node_env=== "development") ? process.env.NEXT_PUBLIC_API_URL_DEV : process.env.NEXT_PUBLIC_API_URL_PROD;
  const [loginComponent, setLoginComponent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showtoast, setShowToast] = useState<boolean>(false);
  const router = useRouter();
  const authHandler = async(type : "signup" | "login", data : LoginPayload | SignUpPayload)=>{
    try {
      if(type === "signup"){
        const response = await fetch(`${api}/auth/sign-up`, {
          method : "POST",
          credentials : "include",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(data)
        })
        const resData : SignUpResponse = await response.json();
        if(!response.ok){
          setShowToast(true);
          toast.error(resData.error || "Signup failed");
         
        }
        console.log("Signup successful", resData);
      }else if(type === "login"){
        const response = await fetch(`${api}/auth/login`, {
          method : "POST",
          credentials : "include",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(data)
        })
        const resData : LoginResponse = await response.json();
        if(!response.ok){
          setShowToast(true);
          toast.error(resData.error || "Login failed");
          
          
        }else if(resData.success){

          setShowToast(true)
          toast.success("Login successful");
          router.push("/pages/dashboard");
          console.log("Login successful", resData);
        }
      }else {
        throw new Error("Invalid auth type");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='flex justify-between '>
        {loginComponent ? (<>
        <FieldSet className='w-full max-w-xs m-auto'>
        <h1 className='w-fit m-auto font-extrabold tracking-tight text-balance text-3xl'>Get Started</h1>
        <FieldGroup>
        <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="text" placeholder="johndoe@example.com" onChange={(e) => setEmail(e.target.value)} />
        <FieldDescription>
        Choose a unique email for your account.
        </FieldDescription>
        </Field>
        <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <FieldDescription>
        Must be at least 8 characters long.
        </FieldDescription>
        <Input id="password" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
        </Field>
        <Button onClick={()=> authHandler("login", {email : email, password : password} )} >
        Login
        </Button>
        <h1 className='text-balance tracking-wide'>Create new account <span onClick={()=>setLoginComponent(false)} className='underline text-blue-800 cursor-pointer'>Sign Up</span> </h1>
        </FieldGroup>
        </FieldSet>
        </>) : 
        <FieldSet className='w-full max-w-xs m-auto'>
        <h1 className='w-fit m-auto font-extrabold tracking-tight text-balance text-3xl'>Get Started</h1>
        <FieldGroup>
          <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" type="text" placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
        <FieldDescription>
        Your full name.
        </FieldDescription>
        </Field>
        <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="text" placeholder="johndoe@example.com" onChange={(e) => setEmail(e.target.value)} />
        <FieldDescription>
        Email for your account.
        </FieldDescription>
        </Field>
        <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <FieldDescription>
        Must be at least 8 characters long.
        </FieldDescription>
        <Input id="password" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
        </Field>
        <Button onClick={()=> authHandler("signup", {email : email, password : password, name : name} )} >
        Sign Up
        </Button>
        <h1 className='text-balance tracking-wide'>Already have an account? <span onClick={()=>setLoginComponent(true)} className='underline text-blue-800 cursor-pointer'>Login</span> </h1>
        </FieldGroup>
        </FieldSet>
      }
        <div className='w-1/3 h-screen'><Image
        src={"/bg-bugstate.png"}
        height={300}
        width={700}
        className='h-full '
        alt='bg'
       /></div>
    </div>
  )
}

export default SignUp