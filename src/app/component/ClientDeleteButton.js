"use client"; // ✅ 클라이언트 컴포넌트 선언

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default function ClientDeleteButton({ id,typeOfTable,apiPath }) {
    const router = useRouter(); 
    // ✅ 삭제 후 새로고침
    console.log('ClientDeleteButton', id)
    console.log('typeOfTable', typeOfTable)
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const res = await fetch(`${apiPath}?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh(); // ✅ 서버 데이터 다시 불러오기 (새로고침 없이 업데이트)
    } else {
        const data = await res.json();
        alert(data.error);
    }
  };

  return (
<Menubar className="w-full">
  <MenubarMenu>
    <MenubarTrigger>-</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        수정 
      </MenubarItem>
      <MenubarItem onClick={handleDelete}className="text-red-500">삭제</MenubarItem>
  
    </MenubarContent>
  </MenubarMenu>
</Menubar>


//   <Button onClick={handleDelete} variant="destructive">삭제</Button>

);
}