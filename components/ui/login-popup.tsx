"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import { supabase } from "@/lib/supabase"
export default function LoginPopup() {

  const handleGoogleLogin = async () => {
    const {data,error} = await supabase.auth.signInWithOAuth({
      provider: "google"
    })
    if(error){
      console.error("Error during Google login:", error.message)
    } else {
      console.log("Google login successful:", data)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md font-cabin">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}