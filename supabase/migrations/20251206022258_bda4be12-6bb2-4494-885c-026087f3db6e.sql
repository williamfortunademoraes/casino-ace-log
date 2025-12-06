-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  bio TEXT,
  xp INTEGER DEFAULT 0,
  nivel INTEGER DEFAULT 1,
  vip_nivel TEXT DEFAULT 'Bronze',
  dias_ativos INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

-- Create casas (betting houses) table
CREATE TABLE public.casas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  logo TEXT,
  link TEXT,
  autorizada_governo BOOLEAN DEFAULT false,
  favorito BOOLEAN DEFAULT false,
  total_gasto DECIMAL(12,2) DEFAULT 0,
  total_ganho DECIMAL(12,2) DEFAULT 0,
  lucro_total DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create jogos (games) table
CREATE TABLE public.jogos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  provider TEXT,
  imagem_promocional TEXT,
  rtp_teorico DECIMAL(5,2),
  favorito BOOLEAN DEFAULT false,
  total_jogadas INTEGER DEFAULT 0,
  total_gasto DECIMAL(12,2) DEFAULT 0,
  total_ganho DECIMAL(12,2) DEFAULT 0,
  lucro_total DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create apostas (bets) table
CREATE TABLE public.apostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  casa_id UUID REFERENCES public.casas(id) ON DELETE SET NULL,
  jogo_id UUID REFERENCES public.jogos(id) ON DELETE SET NULL,
  data TIMESTAMPTZ DEFAULT now(),
  valor_apostado DECIMAL(12,2) NOT NULL,
  valor_ganho DECIMAL(12,2) NOT NULL DEFAULT 0,
  lucro DECIMAL(12,2) GENERATED ALWAYS AS (valor_ganho - valor_apostado) STORED,
  resultado TEXT CHECK (resultado IN ('Vitória', 'Derrota', 'Cashout')),
  observacao TEXT,
  screenshot_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.casas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jogos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apostas ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- User roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Casas policies
CREATE POLICY "Users can view own casas" ON public.casas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own casas" ON public.casas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own casas" ON public.casas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own casas" ON public.casas
  FOR DELETE USING (auth.uid() = user_id);

-- Jogos policies
CREATE POLICY "Users can view own jogos" ON public.jogos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own jogos" ON public.jogos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own jogos" ON public.jogos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own jogos" ON public.jogos
  FOR DELETE USING (auth.uid() = user_id);

-- Apostas policies
CREATE POLICY "Users can view own apostas" ON public.apostas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own apostas" ON public.apostas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own apostas" ON public.apostas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own apostas" ON public.apostas
  FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'username');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update casas totals
CREATE OR REPLACE FUNCTION public.update_casa_totals()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE public.casas 
    SET 
      total_gasto = COALESCE((SELECT SUM(valor_apostado) FROM public.apostas WHERE casa_id = NEW.casa_id), 0),
      total_ganho = COALESCE((SELECT SUM(valor_ganho) FROM public.apostas WHERE casa_id = NEW.casa_id), 0),
      lucro_total = COALESCE((SELECT SUM(lucro) FROM public.apostas WHERE casa_id = NEW.casa_id), 0),
      updated_at = now()
    WHERE id = NEW.casa_id;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.casas 
    SET 
      total_gasto = COALESCE((SELECT SUM(valor_apostado) FROM public.apostas WHERE casa_id = OLD.casa_id), 0),
      total_ganho = COALESCE((SELECT SUM(valor_ganho) FROM public.apostas WHERE casa_id = OLD.casa_id), 0),
      lucro_total = COALESCE((SELECT SUM(lucro) FROM public.apostas WHERE casa_id = OLD.casa_id), 0),
      updated_at = now()
    WHERE id = OLD.casa_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Trigger for casa totals
CREATE TRIGGER update_casa_on_aposta
  AFTER INSERT OR UPDATE OR DELETE ON public.apostas
  FOR EACH ROW EXECUTE FUNCTION public.update_casa_totals();

-- Function to update jogos totals
CREATE OR REPLACE FUNCTION public.update_jogo_totals()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE public.jogos 
    SET 
      total_jogadas = COALESCE((SELECT COUNT(*) FROM public.apostas WHERE jogo_id = NEW.jogo_id), 0),
      total_gasto = COALESCE((SELECT SUM(valor_apostado) FROM public.apostas WHERE jogo_id = NEW.jogo_id), 0),
      total_ganho = COALESCE((SELECT SUM(valor_ganho) FROM public.apostas WHERE jogo_id = NEW.jogo_id), 0),
      lucro_total = COALESCE((SELECT SUM(lucro) FROM public.apostas WHERE jogo_id = NEW.jogo_id), 0),
      updated_at = now()
    WHERE id = NEW.jogo_id;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.jogos 
    SET 
      total_jogadas = COALESCE((SELECT COUNT(*) FROM public.apostas WHERE jogo_id = OLD.jogo_id), 0),
      total_gasto = COALESCE((SELECT SUM(valor_apostado) FROM public.apostas WHERE jogo_id = OLD.jogo_id), 0),
      total_ganho = COALESCE((SELECT SUM(valor_ganho) FROM public.apostas WHERE jogo_id = OLD.jogo_id), 0),
      lucro_total = COALESCE((SELECT SUM(lucro) FROM public.apostas WHERE jogo_id = OLD.jogo_id), 0),
      updated_at = now()
    WHERE id = OLD.jogo_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Trigger for jogo totals
CREATE TRIGGER update_jogo_on_aposta
  AFTER INSERT OR UPDATE OR DELETE ON public.apostas
  FOR EACH ROW EXECUTE FUNCTION public.update_jogo_totals();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_casas_updated_at
  BEFORE UPDATE ON public.casas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jogos_updated_at
  BEFORE UPDATE ON public.jogos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();