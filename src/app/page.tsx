import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="flex flex-col w-full text-center h-[20vh] justify-center">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          ikka 的妙妙屋
        </h1>
      </section>
      <Separator className="my-4" />
      <div>
        <p className="block text-muted-foreground my-2">其实首页什么都没有，可以点开左上角的侧边栏看看有没有你感兴趣的东西。</p>
        <p className="block text-muted-foreground my-2">或者你也可以看看这个：</p>
        <Image src="https://raw.githubusercontent.com/ikka0426/ikka.work/refs/heads/master/public/asahi-shakunetsu.png" alt="芹泽朝日和灼热.png" width={512} height={512} className="m-auto"/>
        <p className="block text-muted-foreground my-2 text-sm text-center">两个我推.png</p>
      </div>
    </>
  );
}
