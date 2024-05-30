"use client";

import { Switch } from "@headlessui/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TempToggle = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="flex items-center">
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className="relative inline-flex h-[30px] w-[58px] items-center rounded-full border-2 border-indigo-50 bg-indigo-50 font-semibold text-gray-900 outline-2 outline-indigo-400 drop-shadow-md"
            >
            <span className="pointer-events-none absolute z-10 flex h-full w-full items-center">
              <span className={`flex-1 text-center body-2 ${!enabled ? "text-gray-100" : ""}`}>
                °F
              </span>
              <span className={`flex-1 text-center body-2 ${enabled ? "text-gray-100" : ""}`}>
                °C
              </span>
            </span>
                <span className="sr-only">Enable Celsius</span>
                <span
                    className={cn(
                        "inline-block h-[28px] w-[28px] transform rounded-full bg-indigo-400 text-center transition",
                        enabled ? "translate-x-[26px]" : "translate-x-0"
                    )}
                />
            </Switch>
        </div>
    );
};

export default TempToggle;
