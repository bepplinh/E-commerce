import { Search, ShoppingCart, UserRound, Heart } from 'lucide-react';

export interface ActionItem {
    id: number;
    name: string;
    icon: React.ComponentType<any>;
    href: string;
}

export const actionItems: ActionItem[] = [
  { id: 1, name: 'Search', icon: Search, href: '#' },
  { id: 2, name: 'Profile', icon: UserRound, href: '' },
  { id: 3, name: 'Wishlist', icon: Heart, href: '/wishlist' },
  { id: 4, name: 'Cart', icon: ShoppingCart, href: '/cart' },
];