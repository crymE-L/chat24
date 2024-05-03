import { ResizablePanel } from "@/components/ui/resizable";

export default function PersonalData() {
  return (
    <ResizablePanel className="px-10">
      <p className="text-lg font-semibold">Dados pessoais</p>

      <div className="mt-5 md:space-y-10">
        <div className="space-y-2">
          <p className="text-lg font-semibold">Distrito atual</p>
          <p>Porto</p>
        </div>
      </div>
    </ResizablePanel>
  );
}
