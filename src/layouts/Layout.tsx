import { ReactNode } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] });

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main
        className={`flex flex-col items-center justify-center ${roboto.className}`}
      >
        {children}
      </main>
    </>
  );
}
