import RegisterForm from "./_components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="max-w-[450px] mx-auto py-12 px-6">
            <div className="mb-12 text-center">
                <h1 className="text-2xl font-medium uppercase  inline-block relative text-balance">
                    Register
                    <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-black"></span>
                </h1>
            </div>
            
            <RegisterForm />
        </div>
    );
}