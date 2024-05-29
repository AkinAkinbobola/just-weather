"use client"

import {Switch} from "@nextui-org/react";

const Fahrenheit = () => {
    return (
        <div className={`body-2 text-gray-100`}>
            &deg;F
        </div>
    )
}

const Celsius = () => {
    return (
        <div className={`body-2 text-gray-100`}>
            &deg;C
        </div>
    )
}

const Converter = () => {
    return (
        <div>
            <Switch
                defaultSelected
                size="lg"
                color="success"
                thumbIcon={({isSelected, className}) =>
                    isSelected ? (
                        <Fahrenheit/>
                    ) : (
                        <Celsius/>
                    )
                } classNames={{
                wrapper: "bg-indigo-50 group-data-[selected=true]:bg-indigo-50 ",
                thumb: "bg-indigo-400 p-4",
                base: "p-2"

            }}
            />
        </div>
    );
};

export default Converter;