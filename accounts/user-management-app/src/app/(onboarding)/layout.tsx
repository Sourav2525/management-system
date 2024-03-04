import type { Metadata } from "next";

export default function OnboardingLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
       {children}
      </>   
    );
  }