"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface IProps {
  items: NavItemType[];
}

const SquareSideTabs: React.FC<IProps> = ({ items }) => {
  return (
    <nav className="min-w-[160px]">
      <ul className="w-full">
        {items?.map((item) => {
          return (
            <li className="w-full" key={item.href.toString()}>
              <Link
                className={cn("flex w-full items-center bg-[#F7F5F5] px-[20px] py-[14px]", {
                  "bg-primary text-white": item.isActive,
                })}
                href={item.href}
              >
                <div className="flex-1">{item.name}</div>
                <div>
                  <Image
                    className="flex-none"
                    src={`/svg/${item.isActive ? "white" : "dark"}-arrow-right.svg`}
                    alt="arrow-right"
                    width={5.55}
                    height={11.24}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SquareSideTabs;
