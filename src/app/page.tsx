import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center font-mono p-24">
      <div>Welcome to the Valentines Matchmaker</div>
      <div>Here are the rules</div>
      <div className="pt-24">
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
          It&apos;s in your best interest to expend your points to maximize your
          chances of the match
        </div>
        <div>As the game master, I will not be participating in this game</div>
        <div>4. We try to match people with the same interests</div>
        <div>
          5. If we can&apos;t get you a romantic match, we will try to get you a
          friendly match
        </div>
        <div>
          6. If you match, It&apos;s up to you to decide if you&apos;ll go
          forward with it.
        </div>
        <div>We will social media with your match. Instagram is required.</div>
        <div>
          7. We will be using the hungarian bipartide matching algorithm to
          perform this matching.{" "}
        </div>
        <div>
          For more info, check out{" "}
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
          8. Stay safe out there, I do not assume any liability and by using
          this website, you agree to this
        </div>
      </div>
      <div className="py-24">
        <div>
          Also, Check out{" "}
          <Link href="http://www.rondevu.app" className="underline">
            Rondevu
          </Link>{" "}
          The social hangout app I&apos;m building.
        </div>

        <div>We are releasing it soon</div>
        <div>Good luck friends</div>
        <div>
          reach out to me on {" "}
          <Link
            href="https://discord.com/invite/Fqzse8Yjxh"
            className="underline"
          >
            Discord
          </Link>
          {" "} my name is bee
        </div>
        <div>
          Follow Rondevu on {" "}
          <Link
            href="https://www.instagram.com/rondevuapp/"
            className="underline"
          >
            Instagram
          </Link>
        </div>
      </div>
    </main>
  );
}
