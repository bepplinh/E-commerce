export type Stepper = {
    id: number;
    title: string;
    description: string;
    component: string;
};

const dataStepper: Stepper[] = [
    {
        id: 1,
        title: "shopping bag",
        description: "Manage Your Items List",
        component: "Bag",
    },
    {
        id: 2,
        title: "shipping and checkout",
        description: "Check Your Items List",
        component: "Checkout",
    },
    {
        id: 3,
        title: "Confirmation",
        description: "Review And Submit Your Order",
        component: "Confirmation",
    },
];

export { dataStepper };
