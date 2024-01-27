import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { MainNav } from "@/components/MainNav"
//Este toggle es un dropdown mientras que el otro, es un onclick
// import { ModeToggle } from "@/components/mode-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import UserDropdown from "./modular/UserDropdown"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <GitHubLogoIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link> */}


            <ThemeToggle />
            <UserDropdown />
            {/* <ModeToggle /> */}
          </nav>
        </div>
      </div>
    </header>
  )
}
