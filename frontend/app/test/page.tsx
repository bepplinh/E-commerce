"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Filter = {
    color: string[];
    brand: string[];
    sort: string;
};

function Test() {
    const [filter, setFilter] = useState<Filter>({
        color: ["red"],
        brand: ["nike"],
        sort: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const url = new URLSearchParams();
    url.set("color", "red");
    url.append("brand", "nike");

    console.log(url.toString());

    return (
        <div>
            <select name="color" onChange={handleChange} value={filter.color}>
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
            </select>

            <select name="brand" onChange={handleChange} value={filter.brand}>
                <option value="adidas">adidas</option>
                <option value="nike">nike</option>
                <option value="puma">puma</option>
            </select>
        </div>
    );
}

export default Test;
