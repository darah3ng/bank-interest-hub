'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen dark:bg-gray-900">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Track Interest. Build Wealth. <br />
          <Link href="/app">
            <span className="underline md:text-2xl text-2xl text-white hover:opacity-90 border-2 border-slate-50 p-2">
              Start Tracking
            </span>
          </Link>
        </motion.h1>
      </LampContainer>
    </main>
  );
}
