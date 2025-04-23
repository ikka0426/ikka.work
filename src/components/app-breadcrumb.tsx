"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const pathNames: Record<string, string> = {
  "maimai-dx-to-finale": "舞萌旧框分数换算",
};

export function AppBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key="home" className="hidden md:block">
          <BreadcrumbLink href="/">
            首页
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          return (
            <Fragment key={segment}>
              <BreadcrumbSeparator className="hidden md:block"/>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={href}>
                  {pathNames[segment] || segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          )
        })}
        <BreadcrumbItem className="block md:hidden">
          <BreadcrumbLink href={pathname}>
            {pathNames[lastSegment] || lastSegment || '首页'}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}