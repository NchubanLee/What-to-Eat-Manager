import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${proto}://${host}/og.png`;
  return {
    title: "拾味｜两周餐桌管家",
    description: "为两个人规划两周中的八顿晚餐，统一管理菜谱、采购、库存与食材新鲜度。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title: "拾味｜两周餐桌管家", description: "8 顿晚餐 · 2 人份 · 新鲜度管理", images: [{ url: image, width: 1734, height: 907 }] },
    twitter: { card: "summary_large_image", title: "拾味｜两周餐桌管家", description: "8 顿晚餐 · 2 人份 · 新鲜度管理", images: [image] }
  };
}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
