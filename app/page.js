"use client";

import { motion } from "framer-motion";
import { Shield, Users, Globe, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {

  const [members, setMembers] = useState([]);

  useEffect(() => {

    fetch("http://api.thunderkartells.qzz.io:20253/api/gang", {
      headers: {
        "x-api-key": "YOUR_API_KEY"
      }
    })
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(console.error);

  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#7c3aed22,transparent_40%)]" />

      {/* NAVBAR */}
      <nav className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Shield className="text-red-500" size={30} />
            <h1 className="text-2xl font-bold">
              Thunder Kartells
            </h1>
          </div>
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>
eruda.init();
</script>
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="#">Home</a>
            <a href="#">Gang</a>
            <a href="#">Logs</a>
            <a href="#">Security</a>
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
            <span className="text-red-500"> KARTELLS</span>
          </h1>

          <p className="mt-6 text-zinc-400 max-w-2xl text-lg">
            Elite Discord Management • Antinuke • Security • API Powered Dashboard
          </p>

          <div className="flex gap-4 mt-10">

            <button className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl font-bold">
              Join Discord
            </button>

            <button className="border border-white/10 hover:bg-white/5 transition px-6 py-3 rounded-2xl">
              Dashboard
            </button>

          </div>

        </motion.div>

      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">

        {[
          {
            title: "Members",
            value: members.length,
            icon: Users
          },
          {
            title: "API",
            value: "ONLINE",
            icon: Globe
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

              <Icon className="text-red-500 mb-4" size={32} />

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
