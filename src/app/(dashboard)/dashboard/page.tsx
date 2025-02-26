"use client";

import Content from "@/components/dashboard/content";
import { AppSidebar } from "@/components/dashboard/layout/sidebar";
import TopNav from "@/components/dashboard/layout/top-nav";
import { Footer } from "@/components/shared/Footer";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Dashboard() {
  return ( 
    <div className="flex flex-col min-h-screen">
    <SidebarProvider className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <TopNav/>
          <div className="bg-color1 flex flex-1 gap-4 p-4">
           <Content/>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  </div>
  );
}
