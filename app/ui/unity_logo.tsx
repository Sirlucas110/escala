import Image from "next/image";
import Logo from '@/public/unity_logo.png'

export default function UnityLogo() {
  return (
    <Image
      src={Logo}
      alt="Logo Unity"
      width={40}
      height={40}
      className="mix-blend-multiply dark:mix-blend-screen object-contain"
    />
  );
}
