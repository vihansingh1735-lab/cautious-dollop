"use client";

import { motion } from "framer-motion";

import {
  Shield,
  Users,
  Activity,
  Crown,
  Star,
  Sword
} from "lucide-react";

import {
  signIn,
  signOut,
  useSession
} from "next-auth/react";

import {
  useEffect,
  useState
} from "react";

export default function Home() {

  const { data: session } = useSession();

  const [members, setMembers] = useState([]);

  useEffect(() => {

  fetch("/api/gang")
    .then(async res => {

      const data =
        await res.json();

      console.log(data);

      if (Array.isArray(data)) {

        setMembers(data);

      } else {

        console.log(
          "Not array:",
          data
        );

        setMembers([]);

      }

    })
    .catch(err => {

      console.log(err);

    });

}, []);
      .then(res => res.json())
.then(data => {

  if (Array.isArray(data)) {
    setMembers(data);
  } else {
    setMembers([]);
    console.log(data);
  }

})
      .catch(console.error);

  }, []);

  const groupedMembers = {

    Founder:
      members.filter(
        m => m.role === "Founder"
      ),

    Management:
      members.filter(
        m => m.role === "Management"
      ),

    Moderator:
      members.filter(
        m => m.role === "Moderator"
      ),

    Member:
      members.filter(
        m => m.role === "Member"
      )

  };

  const roleIcons = {
    Founder: Crown,
    Management: Shield,
    Moderator: Sword,
    Member: Star
  };

  return (

    <main className="
      relative
      min-h-screen
      text-white
      overflow-hidden
      bg-black
    ">

      {/* FLASHY BACKGROUND */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute inset-0 bg-black" />

        <div className="
          absolute
          top-[-250px]
          left-[-200px]
          w-[600px]
          h-[600px]
          bg-sky-500/30
          blur-[160px]
          rounded-full
        " />

        <div className="
          absolute
          bottom-[-250px]
          right-[-200px]
          w-[600px]
          h-[600px]
          bg-cyan-400/20
          blur-[160px]
          rounded-full
        " />

        <div className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]
        " />

      </div>

      {/* NAVBAR */}

      <nav className="
        sticky
        top-0
        z-50
        border-b
        border-white/10
        bg-black/30
        backdrop-blur-2xl
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        ">

          <div className="flex items-center gap-3">

            <Shield
              className="text-sky-400"
              size={32}
            />

            <h1 className="
              text-2xl
              font-black
              tracking-wide
            ">
              Thunder Kartells
            </h1>

          </div>

          <div className="
            flex
            gap-6
            text-sm
            text-zinc-300
          ">

            <a href="#">
              Home
            </a>

            <a href="#">
              Members
            </a>

            <a href="#">
              Stats
            </a>

            <a href="#">
              Dashboard
            </a>

          </div>

        </div>

      </nav>

      {/* HERO */}

      <section className="
        max-w-7xl
        mx-auto
        px-6
        pt-32
        pb-24
      ">

        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
        >

          <h1 className="
            text-7xl
            md:text-8xl
            font-black
            leading-tight
          ">

            THUNDER

            <span className="
              text-sky-400
              drop-shadow-[0_0_30px_rgba(56,189,248,0.8)]
            ">
              {" "}KARTELLS
            </span>

          </h1>

          <p className="
            mt-6
            text-zinc-300
            text-lg
            max-w-2xl
          ">

            Built On Unity • Hard Work • Leadership

          </p>

          <div className="
            flex
            gap-4
            mt-10
            flex-wrap
          ">

            <a
              href="https://discord.gg/ehtk"
              target="_blank"
              className="
                bg-sky-500
                hover:bg-sky-400
                transition
                px-7
                py-3
                rounded-2xl
                font-bold
                shadow-[0_0_25px_rgba(56,189,248,0.5)]
              "
            >
              Join Discord
            </a>

            {!session ? (

              <button
                onClick={() =>
                  signIn("discord")
                }
                className="
                  border
                  border-sky-400/30
                  bg-white/5
                  hover:bg-white/10
                  transition
                  px-7
                  py-3
                  rounded-2xl
                "
              >
                Login With Discord
              </button>

            ) : (

              <button
                onClick={() =>
                  signOut()
                }
                className="
                  border
                  border-red-500/30
                  bg-red-500/10
                  hover:bg-red-500/20
                  transition
                  px-7
                  py-3
                  rounded-2xl
                "
              >
                Logout
              </button>

            )}

          </div>

        </motion.div>

      </section>

      {/* STATS */}

      <section className="
        max-w-7xl
        mx-auto
        px-6
        grid
        md:grid-cols-3
        gap-6
      ">

        {[
          {
            title: "Members",
            value: members.length,
            icon: Users
          },

          {
            title: "Protection",
            value: "ACTIVE",
            icon: Shield
          },

          {
            title: "Status",
            value: "SECURED",
            icon: Activity
          }

        ].map((item, i) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={i}
              whileHover={{
                scale: 1.03
              }}
              className="
                bg-white/10
                border
                border-sky-400/20
                backdrop-blur-2xl
                rounded-3xl
                p-7
                shadow-[0_0_40px_rgba(56,189,248,0.15)]
              "
            >

              <Icon
                className="
                  text-sky-400
                  mb-4
                "
                size={36}
              />

              <h2 className="
                text-zinc-300
                text-sm
              ">
                {item.title}
              </h2>

              <p className="
                text-4xl
                font-black
                mt-2
              ">
                {item.value}
              </p>

            </motion.div>

          );

        })}

      </section>

      {/* MEMBERS */}

      <section className="
        max-w-7xl
        mx-auto
        px-6
        py-28
      ">

        <h2 className="
          text-5xl
          font-black
          mb-16
        ">
          Gang Members
        </h2>

        {Object.entries(groupedMembers).map(([role, users]) => {

          if (users.length === 0)
            return null;

          const Icon = roleIcons[role];

          return (

            <div
              key={role}
              className="mb-20"
            >

              <div className="
                flex
                items-center
                gap-4
                mb-8
              ">

                <Icon
                  className="
                    text-sky-400
                  "
                  size={34}
                />

                <h3 className="
                  text-4xl
                  font-black
                  text-sky-300
                ">
                  {role}
                </h3>

              </div>

              <div className="
                grid
                md:grid-cols-4
                gap-6
              ">

                {users.map((member, i) => (

                  <motion.div
                    key={i}
                    whileHover={{
                      y: -8,
                      scale: 1.02
                    }}
                    className="
                      relative
                      bg-white/10
                      border
                      border-sky-400/20
                      backdrop-blur-2xl
                      rounded-3xl
                      p-6
                      overflow-hidden
                      shadow-[0_0_40px_rgba(56,189,248,0.15)]
                    "
                  >

                    <div className="
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-sky-400/10
                      to-transparent
                      pointer-events-none
                    " />

                    <img
                      src={member.avatar}
                      className="
                        w-24
                        h-24
                        rounded-full
                        border-4
                        border-sky-400
                        object-cover
                      "
                    />

                    <h3 className="
                      mt-5
                      text-2xl
                      font-black
                    ">
                      {member.username}
                    </h3>

                    <p className="
                      text-sky-300
                      text-sm
                      mt-1
                    ">
                      {member.role || "Member"}
                    </p>

                  </motion.div>

                ))}

              </div>

            </div>

          );

        })}

      </section>

    </main>

  );

                  }
