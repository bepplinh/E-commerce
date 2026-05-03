

export default function OrSeparator() {
    return (
        <div className="relative my-6">
            <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
            >
                <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-medium">
                <span className="bg-white px-4 text-gray-400">
                    Or continue with
                </span>
            </div>
        </div>
    );
}
