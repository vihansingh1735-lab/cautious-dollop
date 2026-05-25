"use client";

import { motion } from "framer-motion";
import { Shield, Users, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {

  const [members, setMembers] = useState([]);

  useEffect(() => {

    fetch("http://51.83.6.7:20253/api/gang", {
      headers: {
        "x-api-key": "dp_live_JbLRZzyMCZ0HAS9t7WpRmomM"
      }
    })
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(console.error);

  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source
          src="https://cdn.discordapp.com/app-assets/356876590342340608/store/1486738060996644944.mp4?size=4096"
          type="video/mp4"
        />
      </video>

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 bg-black/60 -z-10" />

      {/* NAVBAR */}
      <nav className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Shield className="text-red-500" size={30} />
            <h1 className="text-2xl font-bold">
              Thunder Kartells
            </h1>
          </div>

          <div className="flex gap-6 text-sm text-zinc-300">
            <a href="#">Home</a>
            <a href="#">Gang</a>
            <a href="#">Logs</a>
          </div>

        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-28">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

          <h1 className="text-7xl font-black leading-tight">
            THUNDER
            <span className="text-blue-500"> KARTELLS</span>
          </h1>

          <p className="mt-6 text-zinc-300 max-w-2xl text-lg">
            Built On Unity • Hard Work • Leadership
          </p>

          <div className="flex gap-4 mt-10">

            <a
              href="https://discord.gg/ehtk"
              target="_blank"
              className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl font-bold"
            >
              Join Discord
            </a>

            <a
              href="http://51.83.6.7:20253"
              target="_blank"
              className="border border-white/10 hover:bg-white/5 transition px-6 py-3 rounded-2xl"
            >
              Dashboard
            </a>

          </div>

        </motion.div>

      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">

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
              whileHover={{ scale: 1.04 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6"
            >

              <Icon className="text-white-500 mb-4" size={32} />

              <h2 className="text-zinc-400 text-sm">
                {item.title}
              </h2>

              <p className="text-3xl font-black mt-2">
                {item.value}
              </p>

            </motion.div>
          );

        })}

      </section>

      {/* MEMBERS */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="text-4xl font-black mb-10">
          Gang Members
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {members.map((member, i) => (

            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl"
            >

              <img
                src={member.avatar}
                alt=""
                className="w-20 h-20 rounded-full border-2 border-red-500"
              />

              <h3 className="mt-4 text-xl font-bold">
                {member.username}
              </h3>

              <p className="text-zinc-400 text-sm mt-1">
                {member.id}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

    </main>
  );
}
