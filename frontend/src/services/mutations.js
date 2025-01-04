import { useMutation, useQueryClient } from "react-query";
import { signIn, signUp, verifyEmail } from "./api";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export function useSignInMutaion() {
    const { setAccessToken } = useAuthStore()

    return useMutation({
        mutationFn: (credentails) => signIn(credentails),
        onSuccess: ({ data }) => {
            console.log(data)
            setAccessToken(data.accessToken)
        },
    })
}

export function useSignUpMutation() {
    return useMutation({
        mutationFn: (credentails) => signUp(credentails),
        onSuccess: ({ data }) => { toast.success(data.message) }
    })
}
