import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { Description } from "@radix-ui/react-toast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const initialState = {

    email : '',
    password :''
}
function AuthLogin() {

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const {toast} = useToast();


    function onSubmit(event){
        event.preventDefault()

        dispatch(loginUser(formData)).then((data) => {
            if(data?.payload?.success){
                toast({
                    title: "WELCOME Back!",
                    description: data?.payload?.message,
                });
                window.location.reload(); 
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: data?.payload?.message,
                    
                });
                window.location.reload();  
            }}
    );

    }
    return (  
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Sign In
                </h1>
                <p>Dont have an account?
                    <Link
                    className="font-medium ml-2 text-primary hover:underline"
                    to="/auth/register">
                        Register
                    </Link>
                </p>
            </div>
            <CommonForm
            formControls={loginFormControls}
            buttonText={'Sign Up'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthLogin;