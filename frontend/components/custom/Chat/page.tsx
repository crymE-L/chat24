import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Chat() {
  return (
    <div className="h-full">
      <ScrollArea className="h-5/6">
        <p className="bg-green-500 bg-opacity-60 rounded-lg rounded-bl-none px-3 py-2">
          Olá! Eu sou o Chat 24, o seu assistente virtual do Serviço Nacional de
          Saúde Português. Em que posso ser útil?
        </p>
        <p className="bg-green-400 bg-opacity-30 rounded-lg rounded-br-none px-3 py-2 mt-5">
          Teste de uma resposta.
        </p>
      </ScrollArea>

      <Input
        type="text"
        placeholder="Estou com dores de cabeça..."
        className="w-full"
      />
    </div>
  );
}
