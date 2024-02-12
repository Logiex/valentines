import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center font-mono py-24 px-8 md:px-24">
      <div className="flex w-full">
        <div className="flex-1"></div>
        <div className="">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="text-5xl">
        NOTE: THE APP CURRENTLY ISN&apos;T WORKING AND WE ARE TRYING TO FIX IT
      </div>
      <div className="py-4 text-lg">Welcome to the Valentines Matchmaker</div>
      <div>Here are the rules and stuff to know about</div>
      <div className="pt-16 ">
        <div>
          1. We will try to match you but we can&apos;t guarantee a matching
        </div>
        <div>
          2. We will match everyone at the same time, once, every 12 or so hours
        </div>
        <div>
          3. You will have a limited amount of points you can spend declaring
          your interests
        </div>
        <div>
          4. It&apos;s in your best interest to expend your points to maximize
          your chances of the match
        </div>
        <div>5. We try to match people with the same interests</div>
        <div>
          6. If we can&apos;t get you a romantic match, we will try to get you a
          friendly match
        </div>
        <div>
          7. If you match, It&apos;s up to you to decide if you&apos;ll go
          forward with it.
        </div>
        <div>8. A valid Instagram account is required.</div>
        <div>
          9. We will be using the hungarian bipartide matching algorithm to
          perform this matching.{" "}
        </div>
        <div>
          10. I couldn&apos;t figure out how to match non binary people, so choose the next best gender on the form
        </div>
        <div>11. I also couldn&apos;t figure out how to match bisexual people, so you have to choose one in the form</div>
        <div>
          12. If you do not get a romantic match, we will put you into the bro
          matching phase.
        </div>
        <div>13. Malicious activity will not be tolerated.</div>
        <div>
          14. If you notice something suspicious, like the instagram account
          doesn&apos;t exist,
        </div>
        <div>
          or the user is a fake, or someone is acting maliciously, DM me on
          discord.
        </div>
        <div>
          15. Stay safe out there, I do not assume any liability and by using
          this website,
        </div>
        <div>you agree to abide by these rules / terms and conditions.</div>

        <div className="pt-4">
          If you want to suggest an interest, dm me on discord
        </div>
        <div className="pt-4">
          For more info about the matching, check out{" "}
          <Link
            href="https://pypi.org/project/Valentine-Matcher-2024/"
            className="underline"
          >
            this link
          </Link>{" "}
          to my python package and{" "}
          <Link
            href="https://brilliant.org/wiki/hungarian-matching/"
            className="underline"
          >
            this
          </Link>{" "}
          for a synopsis of the general algorithm
        </div>
        <div>
          If you want the source code for the algorithm, ask me. I may publish
          it on github later.
        </div>
        <Link href={"/game"}>
          <div className="flex justify-center md:justify-end 	">
            <div className="border border-2 p-8 m-8">
              Check out the valentine matching -&gt;
            </div>
          </div>
        </Link>
        <div>
          <div>
            Also, Check out{" "}
            <Link href="http://www.rondevu.app" className="underline px-2 border border-1 py-1 text-red-500">
              Rondevu
            </Link>{" "}
            The social hangout app I&apos;m building.
          </div>

          <div>We are releasing it soon</div>
          <div>Good luck friends</div>
          <div>
            reach out to me on{" "}
            <Link
              href="https://discord.com/invite/Fqzse8Yjxh"
              className="underline px-2 border border-1 py-1"
            >
              Discord
            </Link>{" "}
            my name is bee
          </div>
          <div>
            Follow Rondevu on{" "}
            <Link
              href="https://www.instagram.com/rondevuapp/"
              className="underline px-2 border border-1 py-1"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
