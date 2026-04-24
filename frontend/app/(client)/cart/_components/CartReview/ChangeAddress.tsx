import useCartStore from "@/stores/useCartStore";

function ChangeAddress() {
    const setModalAddress = useCartStore((state) => state.setModalAddress);
    return (
        <button
            style={
                {
                    "--underline-width": "25%",
                } as React.CSSProperties
            }
            className="underline-hover font-medium uppercase text-gray-900 text-[14px]"
            onClick={setModalAddress}
        >
            Change address
        </button>
    );
}

export default ChangeAddress;
