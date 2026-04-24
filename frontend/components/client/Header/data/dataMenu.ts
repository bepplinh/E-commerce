export interface MenuItem {
    id: number;
    name: string;
    link: string;
}

const dataMenu: MenuItem[] = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Shop", link: "/shop" },
    { id: 3, name: "Cart", link: "/cart" },
    { id: 4, name: "About", link: "/about" },
    { id: 5, name: "Contact", link: "/contact" },
];

export default dataMenu;
