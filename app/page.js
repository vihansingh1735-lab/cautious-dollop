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

  const { data: session } =
    useSession();

  const [members, setMembers] =
    useState([]);

  useEffect(() => {

    fetch("/api/gang")

      .then(async (res) => {

        const data =
          await res.json();

        if (Array.isArray(data)) {

          setMembers(data);

        } else {

          setMembers([]);

        }

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  const groupedMembers = {

    Founder:
      members.filter(
        m =>
          (m.role || "Member")
            === "Founder"
      ),

    Management:
      members.filter(
        m =>
          (m.role || "Member")
            === "Management"
      ),

    Moderator:
      members.filter(
        m =>
          (m.role || "Member")
            === "Moderator"
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
      relative
      min-h-screen
      bg-black
      text-white
      overflow-hidden
    ">

      <div className="
        fixed
        inset-0
        -z-10
        overflow-hidden
      ">

        <div className="
          absolute
          inset-0
          bg-black
        " />

        <div className="
          absolute
          top-[-250px]
          left-[-200px]
          w-[700px]
          h-[700px]
          bg-sky-500/25
          rounded-full
          blur-[180px]
        " />

        <div className="
          absolute
          bottom-[-250px]
          right-[-200px]
          w-[700px]
          h-[700px]
          bg-cyan-400/20
          rounded-full
          blur-[180px]
        " />

        <div className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]
        " />

      </div>

      <section className="
        max-w-7xl
        mx-auto
        px-6
        pt-40
        pb-28
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

          <div className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-white/5
            border
            border-sky-400/20
            backdrop-blur-xl
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
              Thunder Kartells Community
            </span>

          </div>

          <h1 className="
            text-7xl
            md:text-8xl
            font-black
            leading-[0.95]
            tracking-tight
          ">

            Built Different.

            <br />

            <span className="
              text-sky-400
              drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]
            ">

              Thunder Kartells

            </span>

          </h1>

          <p className="
            mt-8
            text-zinc-300
            text-xl
            leading-relaxed
            max-w-2xl
          ">

            A modern organized community built
            on loyalty, leadership and unity.

            Join the network, connect with
            members and experience the next
            generation Thunder Kartells system.

          </p>

          <div className="
            flex
            gap-4
            flex-wrap
            mt-12
          ">

            <a
              href="https://discord.gg/ehtk"
              target="_blank"
              className="
                bg-sky-500
                hover:bg-sky-400
                transition-all
                duration-300
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                shadow-[0_0_30px_rgba(56,189,248,0.45)]
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
                  bg-white/5
                  hover:bg-white/10
                  border
                  border-white/10
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  px-8
                  py-4
                  rounded-2xl
                  text-lg
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
                  bg-red-500/10
                  hover:bg-red-500/20
                  border
                  border-red-500/20
                  transition-all
                  duration-300
                  px-8
                  py-4
                  rounded-2xl
                  text-lg
                "
              >

                Logout

              </button>

            )}

          </div>

          {session && (

            <div className="
              mt-10
              flex
              items-center
              gap-4
            ">

              <img
                src={session.user.image}
                alt=""
                className="
                  w-16
                  h-16
                  rounded-full
                  border-2
                  border-sky-400
                "
              />

              <div>

                <h2 className="
                  text-2xl
                  font-bold
                ">
                  {session.user.name}
                </h2>

                <p className="
                  text-zinc-400
                  text-sm
                ">
                  Connected with Discord
                </p>

              </div>

            </div>

          )}

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

      <section
        id="members"
        className="
          max-w-7xl
          mx-auto
          px-6
          py-28
        "
      >

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
