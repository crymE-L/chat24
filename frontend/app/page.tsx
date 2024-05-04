import Chat from "@/components/custom/Chat/page";
import Header from "@/components/custom/Header/page";
import PersonalData from "@/components/custom/PersonalData/page";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <main className="">
      <Header />

      <section className="w-screen h-screen pt-32 pb-5">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="h-full px-10">
            <Chat />
          </ResizablePanel>
          <ResizableHandle />
          <PersonalData />
        </ResizablePanelGroup>
      </section>
    </main>
  );
}
