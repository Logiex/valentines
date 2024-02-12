import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ApolloWrapper } from "@/utils/apollo_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Valentine Matcher",
  description: "Find you next Valentine, or Bromitine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignInUrl="/test" afterSignUpUrl="/test" allowedRedirectOrigins={["https://valentine.rondevu.app"]}>
      <ApolloWrapper>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ApolloWrapper>
    </ClerkProvider>
  );
}
