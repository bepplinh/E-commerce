import Address from "./_components/Address/Address";
import Content from "./_components/Content";

export default function Cart() {
    return (
        <div className=" relative w-full max-w-[1440px] mx-auto flex flex-col p-5">
            <Content />
            <Address />
        </div>
    );
}
