"use client";

import { Button } from "@/components/ui/button";
import { FolderDot, LayoutDashboard, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Links = () => {
  const pathname = usePathname();

  return (
    <div>
      <Link href="/dashboard" passHref>
        <Button
          variant={pathname === "/dashboard" ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/projects" passHref>
        <Button
          variant={pathname === "/projects" ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <FolderDot className="mr-2 h-4 w-4" />
          Projects
        </Button>
      </Link>
      <Link href="/projects/create" passHref>
        <Button
          variant={pathname === "/projects/create" ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </Link>
    </div>
  );
};

export default Links;
