import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { PageTransition } from '@/components/PageTransition';
import { CinematicLoader } from '@/components/Loader';
import { CursorEffect } from '@/components/CursorEffect';
import { ParticleField } from '@/components/ParticleField';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Navbar } from '@/components/Navbar';
import Home from '@/pages/Home';
import Vision from '@/pages/Vision';
import Pillars from '@/pages/Pillars';
import Impact from '@/pages/Impact';
import Roadmap from '@/pages/Roadmap';
import Team from '@/pages/Team';

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <ParticleField />
      <PageTransition>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/vision" component={Vision} />
          <Route path="/pillars" component={Pillars} />
          <Route path="/impact" component={Impact} />
          <Route path="/roadmap" component={Roadmap} />
          <Route path="/team" component={Team} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base="/technova-2047">
          <CinematicLoader />
          <CursorEffect />
          <ScrollProgress />
          <Navbar />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;