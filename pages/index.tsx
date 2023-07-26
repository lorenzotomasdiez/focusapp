import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { MainLayout, SpeechSynthesisComponent } from "@/components";

export default function Home() {
  return (
    <MainLayout>
      <h1>Next.js Speech Synthesis</h1>
      <p>Presiona el botón para escuchar un mensaje de prueba.</p>
      <SpeechSynthesisComponent />
    </MainLayout>
  );
}
