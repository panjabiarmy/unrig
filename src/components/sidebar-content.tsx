"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";

import { Tab, Tabs } from "@heroui/react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface SidebarContentProps {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
    tabs?: Array<{ href: string; title: string, Component: React.ComponentType<any> }>;
}

export default function SidebarContent({ title, subtitle, tabs = [] }: SidebarContentProps) {
    const { pathname } = useLocation();
    const navigate = useNavigate();


    return <div id="sidebar-content" className="w-full max-w-4xl flex-1 p-4">
        {/* Title */}
        <div className="flex items-center gap-x-3">
            <h1 className="text-3xl font-bold leading-9 text-default-foreground">
                {/* Settings */}
                {title || "Settings"}
            </h1>
            <Button
                isIconOnly
                size="sm"
                variant="flat"
                onPress={() => navigate(0)}
            >
                <Icon
                    className="text-default-500"
                    icon="solar:refresh-linear"
                    width={20}
                />
            </Button>
        </div>
        <h2 className="mt-2 text-small text-default-500">
            {subtitle || "Manage your account settings and preferences."}
            {/*  */}
        </h2>
        {/*  Tabs */}
        {tabs.length > 1 && <Tabs
            fullWidth
            selectedKey={pathname}
            classNames={{
                base: "mt-4",
                cursor: "bg-content1 dark:bg-content1",
                panel: "w-full p-0 pt-4",
            }}
        >
            {tabs.map((tab) => (
                <Tab key={tab.href} href={tab.href} title={tab.title} />
            ))}
        </Tabs>}
        <Outlet />
    </div>

}