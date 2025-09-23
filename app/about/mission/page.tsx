import Button from "@/app/components/Button";
import cat from "@/public/images/cat.jpg";
import Image from "next/image";

export default function Mission() {
  return (
    <main className="mt-6">
      <div>Mission</div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ab nemo
        maiores, facilis eum accusantium harum aut deserunt reprehenderit quasi
        ipsum libero perferendis dolorem laborum itaque dolores dicta maxime
        adipisci!
      </p>
      <div className="w-[400px]">
        <Image src={cat} alt="Cat image" placeholder="blur" />
      </div>
      <Button />
    </main>
  );
}
