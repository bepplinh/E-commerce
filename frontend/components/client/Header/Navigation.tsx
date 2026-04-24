import dataMenu from "./data/dataMenu";

function Navigation() {
    return (
        <nav>
            <ul className="flex items-center gap-5 list-none ">
                {dataMenu.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.link}
                            className="underline-hover pb-1 transition-colors hover:text-black uppercase text-[14px] font-medium"
                        >
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navigation;
