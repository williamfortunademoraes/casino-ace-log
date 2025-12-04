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
import Promocoes from "./pages/Promocoes";
import CasasAutorizadas from "./pages/CasasAutorizadas";
import Favoritos from "./pages/Favoritos";
import Limites from "./pages/Limites";
import Calculadora from "./pages/Calculadora";
import Comparador from "./pages/Comparador";
import Auth from "./pages/Auth";
import Perfil from "./pages/Perfil";
import Providers from "./pages/Providers";
import Aprendizados from "./pages/Aprendizados";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/nova-aposta" element={<NovaAposta />} />
          <Route path="/casas" element={<Casas />} />
          <Route path="/casas/:id" element={<CasaDetalhes />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/jogos/:id" element={<JogoDetalhes />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/aprendizados" element={<Aprendizados />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/comparador" element={<Comparador />} />
          <Route path="/promocoes" element={<Promocoes />} />
          <Route path="/casas-autorizadas" element={<CasasAutorizadas />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/limites" element={<Limites />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
