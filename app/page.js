"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Shield,
  Users,
  Crown,
  Star,
  Sword
} from "lucide-react";

import {
  signIn,
  signOut,
  useSession
} from "next-auth/react";

export default function Home() {

  const { data: session } =
    useSession();

  const [members, setMembers] =
    useState([]);

  useEffect(() => {

    fetch("/api/gang")

      .then(res => res.json())

      .then(data => {

        if (Array.isArray(data)) {
          setMembers(data);
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
        m =>
          !m.role ||
          m.role === "Member"
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
      min-h-screen
      bg-black
      text-white
      overflow-hidden
      relative
    ">

      <div className="
        fixed
        inset-0
        -z-10
      ">

        <div className="
          absolute
          inset-0
          bg-black
        " />

        <div className="
          absolute
          top-[-200px]
          left-[-150px]
          w-[600px]
          h-[600px]
          rounded-full
          bg-sky-500/20
          blur-[160px]
        " />

        <div className="
          absolute
          bottom-[-200px]
          right-[-150px]
          w-[600px]
          h-[600px]
          rounded-full
          bg-cyan-400/20
          blur-[160px]
        " />

      </div>

      <section className="
        max-w-7xl
        mx-auto
        px-6
        pt-40
        pb-24
      ">

        <motion.div

          initial={{
            opacity: 0,
            y: 50
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1
          }}

        >

          <div className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            border-sky-400/20
            bg-white/5
            mb-8
          ">

            <div className="
              w-2
              h-2
              rounded-full
              bg-sky-400
              animate-pulse
            " />

            <span className="
              text-sm
              text-zinc-300
            ">
              Thunder Kartells
            </span>

          </div>

          <h1 className="
            text-7xl
            md:text-8xl
            font-black
            leading-[0.95]
          ">

            Built Different

            <br />

            <span className="
              text-sky-400
              drop-shadow-[0_0_30px_rgba(56,189,248,0.7)]
            ">

              Thunder Kartells

            </span>

          </h1>

          <p className="
            mt-8
            text-zinc-300
            text-xl
            max-w-2xl
            leading-relaxed
          ">

            A modern organized community
            built on loyalty, leadership
            and unity.

          </p>

          <div className="
            flex
            gap-4
            flex-wrap
            mt-10
          ">

            <a
              href="https://discord.gg/ehtk"
              target="_blank"
              className="
                bg-sky-500
                hover:bg-sky-400
                transition
                px-8
                py-4
                rounded-2xl
                font-bold
                shadow-[0_0_30px_rgba(56,189,248,0.4)]
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
                  border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition
                  px-8
                  py-4
                  rounded-2xl
                "
              >

                Login

              </button>

            ) : (

              <button

                onClick={() =>
                  signOut()
                }

                className="
                  border
                  border-red-500/20
                  bg-red-500/10
                  hover:bg-red-500/20
                  transition
                  px-8
                  py-4
                  rounded-2xl
                "
              >

                Logout

              </button>

            )}

          </div>

        </motion.div>

      </section>

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
            title: "Status",
            value: "Secured",
            icon: Shield
          },

          {
            title: "System",
            value: "Active",
            icon: Star
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
              "
            >

              <Icon
                className="
                  text-sky-400
                  mb-4
                "
                size={34}
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
          Community Members
        </h2>

        {Object.entries(groupedMembers)
          .map(([role, users]) => {

            if (users.length === 0)
              return null;

            const Icon =
              roleIcons[role];

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
                        bg-white/10
                        border
                        border-sky-400/20
                        rounded-3xl
                        p-6
                        backdrop-blur-2xl
                      "
                    >

                      <img
                        src={member.avatar}
                        alt=""
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
