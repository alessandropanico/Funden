import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { EventsComponent } from './pages/events/events.component';
import { ProjectsiqoComponent } from './pages/projectsiqo/projectsiqo.component';
import { CompanyComponent } from './pages/company/company.component';
import { ProjectdetailsComponent } from './pages/projectdetails/projectdetails.component';
import { DiscoverUsComponent } from './pages/discover-us/discover-us.component';
import { RegisterprivateComponent } from './pages/registerprivate/registerprivate.component';
import { LoginprivateComponent } from './pages/loginprivate/loginprivate.component';
import { DeleteAccountComponent } from './pages/delete-account/delete-account.component';

const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: 'events', component: EventsComponent },
  { path: 'projectsiqo', component: ProjectsiqoComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'projectdetails', component: ProjectdetailsComponent },
  { path: 'discoverus', component: DiscoverUsComponent },
  { path: 'deleteaccount', component: DeleteAccountComponent },

  //Registrazione e login privati
  { path: 'registerprivate', component: RegisterprivateComponent },
  { path: 'loginprivate', component: LoginprivateComponent },

  //Rotta default
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
