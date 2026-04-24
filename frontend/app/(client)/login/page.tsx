import React from "react";
import LoginHeader from "./_components/LoginHeader";
import LoginForm from "./_components/LoginForm";

export default function Login() {
    return (
        <main className="min-h-[50vh] flex items-center justify-center">
            <div className="w-full max-w-[600px] bg-white p-8 md:p-12">
                <LoginHeader />
                <LoginForm />
            </div>
        </main>
    );
}
