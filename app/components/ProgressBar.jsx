"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    NProgress.set(0.4); // Optional: show partial bar immediately

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500); // Simulate loading finish time

    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
