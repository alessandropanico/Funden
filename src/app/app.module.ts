import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SliderHomeComponent } from './shared/slider-home/slider-home.component';

import { register } from 'swiper/element/bundle';
import { SliderHomeDueComponent } from './shared/slider-home-due/slider-home-due.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { EventsComponent } from './pages/events/events.component';
import { ProjectsiqoComponent } from './pages/projectsiqo/projectsiqo.component';
import { CompanyComponent } from './pages/company/company.component';
import { ProjectdetailsComponent } from './pages/projectdetails/projectdetails.component';
import { SliderProjecDetailsComponent } from './shared/slider-projec-details/slider-projec-details.component';
import { DiscoverUsComponent } from './pages/discover-us/discover-us.component';
register();

//-----

import { HeaderMobileComponent } from './shared/header-mobile/header-mobile.component';
import { TitleComponent } from './shared/title/title.component';
import { InputNumberSoloComponent } from './shared/input-number-solo/input-number-solo.component';
import { ButtonComponent } from './shared/button/button.component';
import { VerificationCodeSoloComponent } from './shared/verification-code-solo/verification-code-solo.component';
import { TimerComponent } from './shared/timer/timer.component';
import { GenericInputComponent } from './shared/generic-input/generic-input.component';
import { PinSoloComponent } from './shared/pin-solo/pin-solo.component';
import { TermsAndConditionComponent } from './shared/terms-and-condition/terms-and-condition.component';
import { CongratulationsComponent } from './shared/congratulations/congratulations.component';
import { RegisterprivateComponent } from './pages/registerprivate/registerprivate.component';
import { LoginprivateComponent } from './pages/loginprivate/loginprivate.component';
import { AccessPinComponent } from './shared/access-pin/access-pin.component';
import { PrivacyTermsModalComponent } from './shared/privacy-terms-modal/privacy-terms-modal.component';
import { PannelloLoginComponent } from './shared/pannello-login/pannello-login.component';
import { QuotasComponent } from './shared/pannello-login/components/quotas/quotas.component';

import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { TopUpBalanceComponent } from "./shared/pannello-login/components/top-up-balance/top-up-balance.component";
import { StripeService } from './services/stripe.service';
import { DeleteAccountComponent } from './pages/delete-account/delete-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SliderHomeComponent,
    SliderHomeDueComponent,
    ContattiComponent,
    EventsComponent,
    ProjectsiqoComponent,
    CompanyComponent,
    ProjectdetailsComponent,
    SliderProjecDetailsComponent,
    DiscoverUsComponent,
    HeaderMobileComponent,
    TitleComponent,
    InputNumberSoloComponent,
    ButtonComponent,
    VerificationCodeSoloComponent,
    TimerComponent,
    GenericInputComponent,
    PinSoloComponent,
    TermsAndConditionComponent,
    CongratulationsComponent,
    RegisterprivateComponent,
    LoginprivateComponent,
    AccessPinComponent,
    PrivacyTermsModalComponent,
    PannelloLoginComponent,
    QuotasComponent,
    DeleteAccountComponent,


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    NgxPaginationModule,
    TopUpBalanceComponent,
    ModalModule.forRoot(),

],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
