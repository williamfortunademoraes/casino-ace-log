import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NovaAposta from "./pages/NovaAposta";
import Casas from "./pages/Casas";
import CasaDetalhes from "./pages/CasaDetalhes";
import Jogos from "./pages/Jogos";
import JogoDetalhes from "./pages/JogoDetalhes";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nova-aposta" element={<NovaAposta />} />
          <Route path="/casas" element={<Casas />} />
          <Route path="/casas/:id" element={<CasaDetalhes />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/jogos/:id" element={<JogoDetalhes />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
